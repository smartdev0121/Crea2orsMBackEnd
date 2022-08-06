import { body as bodyCheck } from "express-validator";
import HomePage from "src/models/HomePage.model";
import Collections from "src/models/Collections.model";
import { validator } from "../helpers/decorators";
import User from "../models/User.model";
import Report from "../models/Report.model";
import NFTs from "../models/NFTs.model";
import LazyOrders from "src/models/LazyOrdes.model";
import stringify from "json-stringify-safe";
import Owners from "src/models/Owners.model";
import Creators from "src/models/Creators.model";
import Activity from "src/models/Activity.model";
import Category from "src/models/Category.model";

export default class ProfileController {
  static async info(req: any, res: any) {
    let user = null;
    const walletAddress = req.params.walletAddress;
    console.log(walletAddress);
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
    // const { keyword } = req.params;
    try {
      const contents = await HomePage.findAll({
        // where: { category: keyword },
        include: [Collections],
      });

      res.json({ contents });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }

  static async fetchCollectionsByCategory(req: any, res: any) {
    const { id } = req.body;
    try {
      const category = await Category.findOne({ where: { id: id } });
      if (!category) {
        return res.json({ collectionsByCategory: [] });
      }
      let collectionsByCategory = [];

      if (category.parent_id == 0) {
        if (id == 1) {
          collectionsByCategory = await Collections.findAll({
            include: [NFTs],
          });
        } else {
          collectionsByCategory = await Collections.findAll({
            where: { category: id },
            include: [NFTs],
          });
        }
      } else {
        collectionsByCategory = await Collections.findAll({
          where: { subCategory: id, category: category.parent_id },
          include: [NFTs],
        });
      }

      res.json({ collectionsByCategory });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ result: err });
    }
  }

  static async reportPage(req: any, res: any) {
    const { content, customUrl } = req.body;
    try {
      const reportUser = await User.findOne({
        where: { custom_url: customUrl },
      });
      await Report.create({
        user_id: req.user.id,
        report_user_id: reportUser.id,
        status: 0,
        content: content,
      });
      res.json({ result: true });
    } catch (err) {
      res.status(401).json({ result: err });
    }
  }

  static async getOnSale(req: any, res: any) {
    const { collection, category } = req.body;
    try {
      const orders1 = await LazyOrders.findAll({
        where: { status: 1, user_id: req.user.id },
        include: [NFTs],
      });

      const newOrders = await getCollectionCategory(orders1);

      res.json({ newOrders: stringify(newOrders) });
    } catch (err) {
      console.log(err);
      res.status(401).json({ result: err });
    }
  }

  static async getOwned(req: any, res: any) {
    try {
      const owner = await Owners.findAll({
        where: { user_id: req.user.id },
        include: [NFTs],
      });

      res.json({ owner });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }

  static async getCreated(req: any, res: any) {
    try {
      const creator = await Creators.findAll({
        where: { user_id: req.user.id },
        include: [NFTs],
      });

      res.json({ creator });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }

  static async getActivity(req: any, res: any) {
    try {
      const activity = await Activity.findAll({
        where: { user_id: req.user.id },
      });

      res.json({ activity });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }
}

const getCollectionCategory = (orders: any) =>
  new Promise(async (resolve, reject) => {
    try {
      let newOrders = [];

      for (let item of orders) {
        const collection = await Collections.findOne({
          where: { id: item.nfts.contract_id },
        });
        newOrders.push({
          ...item,
          category_id: collection.category,
        });
      }

      return resolve(newOrders);
    } catch (err) {
      return reject(err);
    }
  });
