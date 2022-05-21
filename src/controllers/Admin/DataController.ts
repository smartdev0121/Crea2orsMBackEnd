import Collections from "../../models/Collections.model";
import Category from "../../models/admin/Category.model";
import User from "src/models/User.model";
import HomePage from "src/models/HomePage.model";

export default class DataController {
  static async fetchCollectionData(req: any, res: any) {
    const keyword = req.body.keyword;
    console.log(keyword);
    try {
      if (keyword == "All") {
        const collections = await Collections.findAll({ include: [User] });
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
      const categories = await Category.findAll();
      res.json({ categories });
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
    console.log(id);
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
    console.log(option, type, collectionId);
    try {
      if (option == "None") {
        await HomePage.destroy({
          where: { collection_id: collectionId },
        });
      } else {
        const item = await HomePage.findOne({
          where: { collection_id: collectionId, category: type },
        });
        if (item) {
          await HomePage.destroy({
            where: { collection_id: collectionId },
          });
        }
        await HomePage.create({
          collection_id: collectionId,
          category: type,
          mode: option,
        });
      }
      res.json({ result: true });
    } catch (err) {
      console.log(err);
      res.status(401).json({});
    }
  }
}
