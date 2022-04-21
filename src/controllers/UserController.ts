import { Op } from "sequelize";
import { body as bodyCheck } from "express-validator";
import config from "../config";
import randtoken from "rand-token";
import { validator } from "../helpers/decorators";
import User, { UserRoles } from "../models/User.model";
import { sendMailGun } from "../services/mailgun";
import { siteUrl } from "src/helpers";
import jwt from "jsonwebtoken";

export default class UserController {
  static async index(req, res) {
    const users = await User.findAll({
      where: {
        id: { [Op.gt]: 1 },
      },
    });

    res.json(users);
  }

  @validator([
    bodyCheck("email").exists().isEmail(),
    bodyCheck("id").optional().isInt(),
  ])
  static async emailExists(req, res) {
    const { body } = req;
    const id = body.id || req.user.id;
    const user = await User.findByEmail(body.email);
    if (!user || user.id == id) {
      res.json({ exists: false });
    } else {
      res.json({ exists: true });
    }
  }

  @validator([
    bodyCheck("email").exists().isEmail(),
    bodyCheck("nickName").exists(),
  ])
  static async create(req, res) {
    const { body } = req;
    const email = body.email;
    console.log("create==============", body);
    const duplicates = await User.findByEmail(email);
    if (duplicates) {
      res.status(422).json({ email: "dupllicates" });
      return;
    }

    const user = await User.create({
      ...body,
    });
    const token = jwt.sign({ email }, config.APP_SECRET, { expiresIn: 3600 });
    const confirmUrl = `${config.FRONT_URL}/email-confirm/${token}/${email}`;

    sendMailGun(email, "Confirm Email", "emailConfirm", {
      name: body.nickName,
      url: confirmUrl,
    });

    res.json(user);
  }

  static async emailVerified(req, res) {
    const { body } = req;
    const email = body.email;
    console.log("body:", email);
    const user = await User.findByEmail(email);
    user.verified = true;
    await user.save();
    res.json({ result: true });
  }
}
