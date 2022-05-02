import { json, Op } from "sequelize";
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
    const user = await User.findByEmail(email);
    user.verified = true;
    await user.save();
    res.json({ result: true });
  }

  static async getUserInfo(req, res) {
    let user = null;
    console.log("getUSERINFO", req.user.id);
    try {
      user = await User.findByPk(req.user.id);
    } catch (err) {
      console.log(err);
      res.json({ result: false });
    }
    res.json({ ...user.toJSON() });
  }

  static updateProfileBackground(req, res) {
    const { file } = req;
    console.log(file.filename);
  }

  // @validator([bodyCheck("email").exists().isEmail()])
  static async setUserInfo(req, res) {
    const { body, file } = req;
    console.log(req.body);

    const user = await User.findByEmail(body.email);

    if (user && body.email !== req.user.email) {
      res.status(422).json({ email: "duplicates" });
      return;
    }

    user.customUrl = body.customUrl;
    user.bio = body.bio;
    user.personalSite = body.personalSite;

    if (JSON.parse(body.handled)) user.avatar_url = file.filename;
    try {
      await user.save();
    } catch (err) {
      console.log(err);
    }
    res.json(user);
  }

  static async getAvatarUrl(req, res) {
    const user = await User.findByPk(req.user.id);
    res.json({ avatar_url: user.avatar_url });
  }

  static async goProfilePage(req, res) {
    // console.log(req.param);
    console.log(req.params.custom_url);
    // console.log(req.query);
    const user = await User.findByCustomUrl(req.params.custom_url);
    if (user) {
      res.json({ ...user.toJSON() });
      return;
    } else {
      res.status(422).json({ result: false });
    }
  }
}
