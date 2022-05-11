import { body as bodyCheck } from "express-validator";
import { validator } from "../helpers/decorators";
import User from "../models/User.model";

export default class ProfileController {
  static async info(req: any, res: any) {
    let user = null;

    try {
      user = await User.findByPk(req.user.id);
    } catch (err) {
      res.json({ result: false });
    }
    res.json({
      ...user.toJSON(),
    });
  }
}
