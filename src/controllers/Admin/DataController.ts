import Collections from "../../models/Collections.model";
import Category from "../../models/Category.model";
import User from "src/models/User.model";
import HomePage from "src/models/HomePage.model";
import { WhereOptions } from "sequelize/types";
import NFTs from "src/models/NFTs.model";
import Owners from "src/models/Owners.model";
import Report from "src/models/Report.model";

export default class DataController {
  static async blockUser(req: any, res: any) {
    const { id, type } = req.body;
    try {
      const blockableUser = await User.findByPk(id);
      console.log(id, type);
      if (type == "BLOCK") {
        blockableUser.verified = -1;
      } else {
        blockableUser.verified = 0;
      }

      await blockableUser.save();
      const users = await User.findAll({ include: [Collections, Owners] });
      res.json({ users });
    } catch (err) {
      res.status(401).json({ err });
    }
  }
  static async fetchUsersData(req: any, res: any) {
    try {
      const users = await User.findAll({ include: [Collections, Owners] });
      res.json({ users });
    } catch (err) {
      console.log(err);
      res.status(401).json({ result: err });
    }
  }

  static async fetchReports(req: any, res: any) {
    try {
      console.log("???");
      const reports = await Report.findAll({
        include: [
          { model: User, as: "user" },
          { model: User, as: "reportUser" },
        ],
      });

      return res.json({ reports });
    } catch (err) {
      console.log(err);
      res.status(401).json({ err });
      return;
    }
  }

  static async markReportRead(req: any, res: any) {
    try {
      await Report.update(
        { status: 1 },
        { returning: true, where: { status: 0 } }
      );
      return res.json({ result: true });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ err });
    }
  }

  static async deleteReportMsg(req: any, res: any) {
    const { id } = req.body;
    try {
      await Report.destroy({ where: { id: id } });
      const reports = await Report.findAll({
        include: [
          { model: User, as: "user" },
          { model: User, as: "reportUser" },
        ],
      });

      return res.json({ reports });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ err });
    }
  }

  static async fetchCollectionData(req: any, res: any) {
    const keyword = req.body.keyword;
    try {
      if (Number(keyword) == 1) {
        const collections = await Collections.findAll({
          include: [User, NFTs, Owners],
        });
        const homepageDatas = await HomePage.findAll();
        res.json({ collections, homepageDatas });
        return;
      }

      const collections = await Collections.findAll({
        where: { category: keyword },
        include: [User],
      });
      const homepageDatas = await HomePage.findAll({
        where: { category: keyword },
      });
      res.json({ collections, homepageDatas });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }

  static async getCategories(req: any, res: any) {
    try {
      let arrCategories = [];
      const arrParentCty = await Category.findAll({ where: { parent_id: 0 } });
      for (const parentCty of arrParentCty) {
        const nodes = await getNodes(parentCty);
        arrCategories.push({
          id: parentCty.id,
          name: parentCty.name,
          nodes,
        });
      }
      res.json({ categories: arrCategories });
    } catch (err) {
      res.status(401).json({ result: false });
    }
  }

  static async newCategory(req: any, res: any) {
    try {
      await Category.create({
        name: req.body.newName,
        parent_id: 0,
        icon_url: "",
      });
      const categories = await Category.findAll();

      res.json({ categories });
    } catch (err) {
      res.status(401).json({ result: false });
    }
  }

  static async deleteCategory(req: any, res: any) {
    const { id } = req.params;
    try {
      await Category.destroy({ where: { id: id } });
      const categories = await Category.findAll();
      res.json({ categories });
    } catch (err) {
      console.log(err);
      res.status(401).json({ result: false });
    }
  }

  static async modeChanged(req: any, res: any) {
    const { option, type, collectionId } = req.body;
    console.log(type);
    try {
      if (option == "None") {
        await HomePage.destroy({
          where: { collection_id: collectionId, category: type },
        });
      } else {
        const item = await HomePage.findOne({
          where: { collection_id: collectionId, category: type },
        });
        if (item) {
          await HomePage.destroy({
            where: { collection_id: collectionId, category: type },
          });
        }
        await HomePage.create({
          collection_id: collectionId,
          category: type,
          mode: option,
        });
      }

      const homepageDatas = await HomePage.findAll();
      res.json({ homepageDatas });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }
}

const getNodes = (parent: any) =>
  new Promise(async (resolve, reject) => {
    let returnArr = [];
    let arrNodes = await Category.findAll({ where: { parent_id: parent?.id } });
    if (arrNodes.length == 0) return resolve([]);
    for (const node of arrNodes) {
      const nodes = await getNodes(node);
      returnArr.push({
        id: node.id,
        name: node.name,
        nodes,
      });
    }
    return resolve(returnArr);
  });
