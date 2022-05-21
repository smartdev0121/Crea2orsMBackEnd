import { json, Op } from "sequelize";
import { body as bodyCheck } from "express-validator";
import config from "../config";
import { validator } from "../helpers/decorators";
import User from "../models/User.model";
import Followers from "../models/Followers.model";
import Followings from "../models/Followings.model";
import { sendMailGun } from "../services/mailgun";
import { siteUrl } from "src/helpers";
import jwt from "jsonwebtoken";
import {
  sendCR2RewardToNewWallet,
  sendBriseRewardToNewWallet,
} from "../services/web3";

export default class UserController {
  static async index(req: any, res: any) {
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
  static async emailExists(req: any, res: any) {
    const { body } = req;
    const id = body.id || req.user.id;
    const user = await User.findByEmail(body.email);
    if (!user || user.id == id) {
      res.json({ exists: false });
    } else {
      res.json({ exists: true });
    }
  }

  static async setWalletAddress(req, res) {
    const { walletAddress } = req.body;
    console.log("==============", req.body);
    try {
      const user = await User.findByPk(req.user.id);
      if (user.wallet_address) {
        res.json({ exists: true });
      }
      user.wallet_address = walletAddress;
      sendCR2RewardToNewWallet(walletAddress, 1000);
      sendBriseRewardToNewWallet(walletAddress, 1);
      await user.save();
      res.json({ exists: false });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  @validator([
    bodyCheck("email").exists().isEmail(),
    bodyCheck("nick_name").exists(),
  ])
  static async create(req: any, res: any) {
    const { body } = req;
    const email = body.email;
    console.log("=================", body);
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

  static async emailVerified(req: any, res: any) {
    const { body } = req;
    const email = body.email;
    const user = await User.findByEmail(email);
    user.verified = 1;
    await user.save();
    res.json({ result: true });
  }

  static async getUserInfo(req: any, res: any) {
    let user = null;
    const followers = await Followers.findFollowersById(req.user.id);
    const followings = await Followings.findFollowingsById(req.user.id);
    try {
      user = await User.findByPk(req.user.id);
    } catch (err) {
      res.json({ result: false });
    }
    res.json({
      ...user.toJSON(),
      followers: followers,
      followings: followings,
    });
  }

  static updateProfileBackground = async (req: any, res: any) => {
    const { file } = req;
    const user = await User.findByPk(req.user.id);
    user.background_image_url = file.filename;
    await user.save();
    res.json({ ...user.toJSON() });
  };

  static addFollow = async (req: any, res: any) => {
    const otherUser = await User.findByEmail(req.body.email);
    const curUser = await User.findByPk(req.user.id);
    otherUser.followers_num = otherUser.followers_num + 1;
    curUser.followings_num = curUser.followings_num + 1;

    await otherUser.save();
    await curUser.save();
    res.json({ ...otherUser.toJSON() });
  };

  // @validator([bodyCheck("email").exists().isEmail()])
  static async setUserInfo(req: any, res: any) {
    const { body, file } = req;

    const user = await User.findByEmail(body.email);

    if (user && body.email !== req.user.email) {
      res.status(422).json({ email: "duplicates" });
      return;
    }

    user.custom_url = body.customUrl;
    user.bio = body.bio;
    user.personal_site = body.personalSite;

    if (JSON.parse(body.handled)) user.avatar_url = file.filename;
    try {
      await user.save();
    } catch (err) {}
    res.json(user);
  }

  static async getAvatarUrl(req: any, res: any) {
    const user = await User.findByPk(req.user.id);
    res.json({ avatar_url: user.avatar_url });
  }

  static async goProfilePage(req: any, res: any) {
    const user = await User.findByCustomUrl(req.params.custom_url);

    const followers = await Followers.findFollowersById(user.id);
    const followings = await Followings.findFollowingsById(user.id);
    if (user) {
      res.json({
        ...user.toJSON(),
        followers: followers,
        followings: followings,
      });
      return;
    } else {
      res.status(422).json({ result: false });
    }
  }
}
