import { body as bodyCheck } from "express-validator";
import HomePage from "src/models/HomePage.model";
import Collections from "src/models/Collections.model";
import { validator } from "../helpers/decorators";
import User from "../models/User.model";
import Report from "../models/Report.model";

export default class ProfileController {
  static async info(req: any, res: any) {
    let user = null;
    const walletAddress = req.params.walletAddress;
    try {
      user = await User.findOne({
        where: { wallet_address: walletAddress },
      });
    } catch (err) {
      res.json({ result: false });
      return;
    }

    if (!user) {
      res.json(null);
      return;
    }
    res.json({
      ...user.toJSON(),
    });
  }

  static async fetchHomepageContent(req: any, res: any) {
    const { keyword } = req.params;
    console.log(keyword);
    try {
      const contents = await HomePage.findAll({
        where: { category: keyword },
        include: [Collections],
      });

      res.json({ contents });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }

  static async reportPage(req: any, res: any) {
    const { content } = req.body;
    console.log(content);
    try {
      Report.create({
        user_id: req.user.id,
        content: content,
      });
      res.json({ result: true });
    } catch (err) {
      res.status(401).json({ result: err });
    }
  }
}
