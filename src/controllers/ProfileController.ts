import { body as bodyCheck } from "express-validator";
import { validator } from "../helpers/decorators";
import User, { UserRoles } from "../models/User.model";

export default class ProfileController {
  static async info(req, res) {
    const user = await User.findByPk(req.user.id);
    res.json({
      ...user.toJSON(),
    });
  }
}
