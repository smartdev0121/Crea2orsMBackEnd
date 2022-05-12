import Collections from "../models/Collections.model";
import NFTs from "../models/NFTs.model";
import Owners from "../models/Owners.model";
import User from "../models/User.model";
import Orders from "../models/Orders.model";
import {
  sendBriseRewardToNewWallet,
  sendCR2RewardToNewWallet,
} from "../services/web3";
import { Op } from "sequelize";

export default class ContractController {
  static async saveContractInformation(req: any, res: any) {
    const { contractUri, contractAddress, metaData, imageUri } = req.body;
    try {
      const contract = await Collections.create({
        user_id: req.user.id,
        contract_address: contractAddress,
        contract_uri: contractUri,
        name: metaData.name,
        description: metaData.description,
        category: metaData.category,
        subCategory: metaData.subCategory,
        token_limit: metaData.tokenLimit,
        image_url: imageUri,
      });
      const user = await User.findOne({
        where: { id: req.user.id },
      });

      res.json({ result: true });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getContractUri(req: any, res: any) {
    const contractAddress = req.params.contractAddress;

    const contract = await Collections.findOne({
      where: { contract_address: contractAddress },
    });

    const nfts = await NFTs.findAll({
      where: { contract_id: contract.id },
    });

    if (contract) {
      res.json({ id: contract.id, contractUri: contract.contract_uri, nfts });
    } else {
      res.status(422).json({ result: false });
    }
  }

  static async createNFT(req: any, res: any) {
    const {
      contractId,
      metaData,
      metaDataUri,
      fileUri,
      nftId,
      curWalletAddress,
    } = req.body;
    console.log("curWall", curWalletAddress);
    try {
      const NFT = await NFTs.create({
        contract_id: contractId,
        metadata_url: metaDataUri,
        name: metaData.name,
        description: metaData.description,
        batch_size: metaData.batchSize,
        alter_text: metaData.alterText,
        royalty_fee: metaData.royaltyFee,
        nft_id: nftId,
        file_url: fileUri,
        traits: JSON.stringify(metaData.traits),
      });

      await Owners.create({
        nft_id: nftId,
        user_id: req.user.id,
        user_wallet_address: curWalletAddress,
        amount: metaData.batchSize,
      });

      await sendCR2RewardToNewWallet(curWalletAddress, 100);

      res.json({ nftId: NFT.id, name: NFT.name });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getNFT(req: any, res: any) {
    const nftId = req.params.nftId;
    try {
      const NFT = await NFTs.findOne({
        where: { id: nftId },
        include: [Collections],
      });

      const owners = await Owners.findAll({
        where: { nft_id: NFT.nft_id },
        include: [User],
      });

      if (!NFT) {
        res.status(422).json({ result: false });
        return;
      }
      res.json({ ...NFT.toJSON(), owners });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getUserCollections(req: any, res: any) {
    const userId = req.user.id;

    try {
      const collections = await Collections.findAll({
        where: { user_id: userId },
      });
      res.json({ collections });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getAllCollections(req: any, res: any) {
    const userId = req.user.id;

    try {
      const collections = await Collections.findAll();
      res.json({ collections });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async orderCreated(req: any, res: any) {
    const { orderData, nftId } = req.body;
    try {
      const order = await Orders.create({
        nft_id: nftId,
        contract_nft_id: orderData._tokenId,
        creator_id: req.user.id,
        creator_address: orderData._creator,
        amount: orderData._amount,
        price: orderData._price / Math.pow(10, 9),
        start_time: orderData._startTime,
        end_time: orderData._endTime,
        order_type: orderData._orderType,
        buyer_price: orderData._price / Math.pow(10, 9),
        buyer_address: orderData._buyer,
      });

      if (!order) {
        res.status(422).json({ result: false });
      }

      res.json({ newOrder: order });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getOrders(req: any, res: any) {
    const nftId = req.params.nftId;
    console.log(nftId);
    try {
      const ordersData = await Orders.findAll({
        where: { status: 1, nft_id: nftId },
        include: [User],
      });
      console.log(ordersData);
      res.json({ ordersData: ordersData });
    } catch (err) {
      res.status(422).json({ result: false });
      console.log(err);
    }
  }

  static async cancelOrder(req: any, res: any) {
    const { id } = req.body;
    try {
      const order = await Orders.update({ status: 0 }, { where: { id: id } });
      if (order) {
        res.json({ result: true });
      }
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async orderFinalized(req: any, res: any) {
    const { orderData, orderId, nftId } = req.body;

    try {
      const order = await Orders.findOne({
        where: { id: orderId },
      });

      order.status = 0;
      await order.save();

      const previousOwner = await Owners.findOne({
        where: { nft_id: nftId, user_wallet_address: orderData[0] },
      });
      previousOwner.amount == orderData[3]
        ? await previousOwner.destroy()
        : (previousOwner.amount -= orderData[3]);

      const user = await User.findOne({
        where: { wallet_address: orderData[8] },
      });
      const userId = user.id;

      const newOwner = await Owners.findOne({
        where: { user_wallet_address: orderData[8] },
      });

      await sendCR2RewardToNewWallet(orderData[8], 100);

      if (newOwner) {
        newOwner.amount += orderData[3];
      } else {
        await Owners.create({
          nft_id: nftId,
          user_id: userId,
          user_wallet_address: orderData[8],
          amount: orderData[3],
        });
      }

      const ordersData = await Orders.findAll({
        where: { nft_id: nftId, status: 1 },
      });
      res.json({ ordersData });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async newBidPlaced(req, res) {
    const { orderData, orderId, nftId } = req.body;
    console.log("HJJJJJJJJJJJ", orderData, orderId, nftId);
    try {
      const order = await Orders.findOne({ where: { id: orderId } });
      order.buyer_address = orderData[8];
      order.buyer_price = orderData[9] / Math.pow(10, 9);
      await order.save();

      const ordersData = await Orders.findAll({
        where: { nft_id: nftId, status: 1 },
        include: [User],
      });
      res.json({ ordersData });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getUserNfts(req, res) {
    try {
      const userNfts = await Owners.findAll({
        where: { user_id: req.user.id },
        include: [NFTs],
      });
      res.json({ userNfts });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getSearchAsset(req: any, res: any) {
    const keyword = req.body.keyword;
    try {
      const collections = await Collections.findAll({
        where: {
          name: { [Op.like]: "%" + keyword + "%" },
        },
      });

      const nfts = await NFTs.findAll({
        where: {
          name: {
            [Op.like]: "%" + keyword + "%",
          },
        },
      });

      res.json({ collections, nfts });
    } catch (err) {}
  }
}
