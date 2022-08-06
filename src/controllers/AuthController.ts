import jwt from "jsonwebtoken";
import { body as bodyCheck } from "express-validator";
import config from "../config";
import { validator } from "../helpers/decorators";
import User from "../models/User.model";
import { sendMailGun } from "src/services/mailgun";

export default class AuthController {
  @validator([
    bodyCheck("email").exists().isEmail(),
    bodyCheck("password").exists(),
  ])
  // static async login(req: any, res: any) {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({
  //     where: { email },
  //   });

  //   if (!user || !user.validPassword(password)) {
  //     return res.status(401).json({ token: "noToken" });
  //   }

  //   const token = jwt.sign(user.toJSON(), config.APP_SECRET, {
  //     expiresIn: config.JWT_EXPIRE,
  //   });

  //   res.json({ token });
  // }
  static async forgotPassword(req: any, res: any) {
    const { email } = req.body;
    sendMailGun(email, "Reset Password", "userRegisterSuccess", {
      name: req.user.nickName,
    });
    // await sendMail(email, "Reset Password", "userRegisterSuccess", {
    //   name: "Charles",
    // });
    res.json("success");
  }

  // static async resetPassword(req: any, res: any) {
  //   const { password, email } = req.body;
  //   const user = await User.findByEmail(email);
  //   if (!user) {
  //     res.status(422).send("email address is invalid");
  //   }

  //   user.password = password;
  //   user.verified = 1;
  //   await user.save();

  //   const token = jwt.sign(user.toJSON(), config.APP_SECRET, {
  //     expiresIn: config.JWT_EXPIRE,
  //   });

  //   res.json({ token });
  // }
}
