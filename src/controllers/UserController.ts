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

  // @validator([
  //   bodyCheck("email").exists().isEmail(),
  //   bodyCheck("id").optional().isInt(),
  // ])
  // static async emailExists(req: any, res: any) {
  //   const { body } = req;
  //   const id = body.id || req.user.id;
  //   // const user = await User.findByEmail(body.email);
  //   if (!user || user.id == id) {
  //     res.json({ exists: false });
  //   } else {
  //     res.json({ exists: true });
  //   }
  // }
  static async setWalletAddress(req, res) {
    const { walletAddress } = req.body;
    try {
      const user = await User.findOne({
        where: { wallet_address: walletAddress },
      });

      if (user) {
        if (user.verified == -1) {
          res.json({ result: "blocked" });
          return;
        }

        const token = jwt.sign(user.toJSON(), config.APP_SECRET, {
          expiresIn: config.JWT_EXPIRE,
        });
        res.json({ token, user: user.toJSON() });
        return;
      }
      const newUser = await User.create({
        wallet_address: walletAddress,
        custom_url: walletAddress,
      });
      const token = jwt.sign(newUser.toJSON(), config.APP_SECRET, {
        expiresIn: config.JWT_EXPIRE,
      });
      res.json({ token, user: newUser.toJSON() });
      try {
        const result = await sendCR2RewardToNewWallet(walletAddress, 1000);
      } catch (err) {
        // res.json({ result: "cr2" });
        return;
      }
      // res.json({ result: "cr2" });
      try {
        const result1 = await sendBriseRewardToNewWallet(walletAddress, 1);
      } catch (err) {
        // res.json({ result: "brise" });
        return;
      }

      // res.json({ result: "brise" });

      // res.json({ exists: false });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  // @validator([
  //   bodyCheck("email").exists().isEmail(),
  //   bodyCheck("nick_name").exists(),
  // ])
  static async create(req: any, res: any) {
    const { body } = req;

    const user = await User.create({
      ...body,
    });

    // const token = jwt.sign({ email }, config.APP_SECRET, { expiresIn: 3600 });
    // const confirmUrl = `${config.FRONT_URL}/email-confirm/${token}/${email}`;

    // sendMailGun(email, "Confirm Email", "emailConfirm", {
    //   name: body.nickName,
    //   url: confirmUrl,
    // });

    res.json(user);
  }

  static async emailVerify(req: any, res: any) {
    const email = req.params.email;
    const token = jwt.sign({ email }, config.APP_SECRET, { expiresIn: 3600 });
    const confirmUrl = `${config.FRONT_URL}/email-confirm/${token}/${email}`;

    sendMailGun(email, "Confirm Email", "emailConfirm", {
      name: "User",
      url: confirmUrl,
    });

    res.json({});
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
    const { walletAddress } = req.body;
    const user = await User.findOne({
      where: { wallet_address: walletAddress || "" },
    });
    user.background_image_url = file.filename;
    await user.save();
    res.json({ ...user.toJSON() });
  };

  static addFollow = async (req: any, res: any) => {
    const otherUser = await User.findByPk(req.body.other_id);
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
    console.log(body.facebook_username, typeof body.facebook_username);
    try {
      const user = await User.findByPk(req.user.id);
      user.nick_name = body.nick_name;
      user.custom_url = body.customUrl;
      user.bio = body.bio;
      user.personal_site = body.personalSite;
      user.facebook_username = body.facebook_username || "";
      user.twitter_username = body.twitter_username || "";
      user.instagram_username = body.facebook_username || "";

      if (JSON.parse(body.handled)) user.avatar_url = file.filename;
      await user.save();

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }

  static async getAvatarUrl(req: any, res: any) {
    const user = await User.findByPk(req.user.id);
    res.json({ avatar_url: user.avatar_url });
  }

  static async goProfilePage(req: any, res: any) {
    const user = await User.findByCustomUrl(req.params.custom_url);

    if (user) {
      const followers = await Followers.findFollowersById(user.id);
      const followings = await Followings.findFollowingsById(user.id);
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
