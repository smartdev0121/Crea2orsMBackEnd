import { Op } from "sequelize";
import { body as bodyCheck } from "express-validator";
import randtoken from "rand-token";

import { validator } from "../helpers/decorators";
import User, { UserRoles } from "../models/User.model";
import { sendMail } from "../services/sendgrid";
import { siteUrl } from "src/helpers";

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
    bodyCheck("firstName").exists(),
    bodyCheck("lastName").exists(),
  ])
  static async create(req, res) {
    const { body } = req;
    console.log("create==============");
    const duplicates = await User.findByEmail(body.email);
    if (duplicates) {
      res.status(422).json({ email: "dupllicates" });
      return;
    }

    const user = await User.create({
      ...body,
    });

    console.log(user.email);
    // try {
    //   await sendMail(user.email, "You are registered", "userRegisterSuccess", {
    //     name: user.fullName,
    //     loginUrl: siteUrl("/login"),
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    res.json(user);
  }
}
