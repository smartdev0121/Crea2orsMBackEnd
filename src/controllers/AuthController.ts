import jwt from "jsonwebtoken";
import { body as bodyCheck } from "express-validator";
import config from "../config";
import { validator } from "../helpers/decorators";
import User from "../models/User.model";
import { sendCode, verifyCode } from "email-verification-code";
import { send } from "process";
import { sendMailGun } from "src/services/mailgun";
const nodemailer = require("nodemailer");

export default class AuthControlle {
  @validator([
    bodyCheck("email").exists().isEmail(),
    bodyCheck("password").exists(),
  ])
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ token: null });
    }

    const token = jwt.sign(user.toJSON(), config.APP_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });

    res.json({ token });
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;
    console.log(email);
    sendMailGun(email, "Reset Password", "userRegisterSuccess");
    res.json("success");
  }
}
