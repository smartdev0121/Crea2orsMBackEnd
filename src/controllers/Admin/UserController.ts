import jwt from "jsonwebtoken";
import { body as bodyCheck } from "express-validator";
import config from "../../config";
import { validator } from "../../helpers/decorators";
import AdminUser from "../../models/AdminUser.model";
import { sendMailGun } from "src/services/mailgun";

export default class AuthController {
  @validator([bodyCheck("password").exists()])
  static async login(req: any, res: any) {
    const { username, password } = req.body;
    const user = await AdminUser.findOne({
      where: { username: username },
    });

    if (user) {
      if (user.verified == 0) {
        return res.json({ result: "not_verified" });
      }
    }

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ result: "wrong_info" });
    }

    const token = jwt.sign(user.toJSON(), config.APP_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });

    return res.json({ token });
  }

  static async createUser(req: any, res: any) {
    const { values } = req.body;
    const user = AdminUser.create({
      username: values.username,
      password: values.password,
    });
    res.json({ username: values.username });
  }

  static async getProfile(req: any, res: any) {
    const user = await AdminUser.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(401).json({ result: false });
      return;
    }
    res.json({ ...user.toJSON() });
  }

  static async resetPassword(req: any, res: any) {
    const { password } = req.body;
    const user = await AdminUser.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(422).send("email address is invalid");
    }

    user.password = password;
    user.verified = 1;
    await user.save();

    const token = jwt.sign(user.toJSON(), config.APP_SECRET, {
      expiresIn: config.JWT_EXPIRE,
    });

    res.json({ token });
  }
}
