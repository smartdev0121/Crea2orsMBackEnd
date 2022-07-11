import Collections from "../models/Collections.model";
import NFTs from "../models/NFTs.model";
import Owners from "../models/Owners.model";
import User from "../models/User.model";
import Orders from "../models/Orders.model";
import LazyOrders from "../models/LazyOrdes.model";

import {
  sendBriseRewardToNewWallet,
  sendCR2RewardToNewWallet,
} from "../services/web3";
import { Op } from "sequelize";
import Creators from "src/models/Creators.model";

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
      res.json({
        id: contract.id,
        contractUri: contract.contract_uri,
        nfts,
      });
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
      price,
      // nftId,
      signature,
      curWalletAddress,
    } = req.body;

    try {
      const nfts = await NFTs.findAll({ where: { contract_id: contractId } });
      const nftId = nfts[nfts.length - 1]?.id ? nfts[nfts.length - 1]?.id : 0;
      const collection = await Collections.findOne({
        where: { id: contractId },
      });

      if (nfts.length >= collection.token_limit) {
        res.json({ over: collection.token_limit });
        return;
      }

      const NFT = await NFTs.create({
        contract_id: contractId,
        metadata_url: metaDataUri,
        name: metaData.name,
        description: metaData.description,
        batch_size: metaData.batchSize,
        alter_text: metaData.alterText,
        royalty_fee: metaData.royaltyFee,
        nft_id: nftId,
        signature: signature,
        file_url: fileUri,
        traits: JSON.stringify(metaData.traits),
      });

      // await Owners.create({
      //   nft_id: NFT.id,
      //   user_id: req.user.id,
      //   user_wallet_address: curWalletAddress,
      //   amount: metaData.batchSize,
      // });
      const creator = await Creators.create({
        nft_id: NFT.id,
        collection_id: contractId,
        user_id: req.user.id,
        price,
      });
      // if (price != -1) {
      //   await LazyOrders.create({
      //     maker_address: curWalletAddress,
      //     nftId: NFT.id,
      //     amount: metaData.batchSize,
      //     price: price,
      //     status: 1,
      //     user_id: req.user.id,
      //   });
      // }

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
      if (!NFT) {
        res.status(422).json({ result: false });
        return;
      }

      const owners = await Owners.findAll({
        where: { nft_id: nftId },
        include: [User],
      });

      const creator = await Creators.findOne({
        where: { nft_id: nftId },
        include: [User, NFTs],
      });

      res.json({ ...NFT.toJSON(), owners, creator });
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
    const { orderData } = req.body;
    try {
      // const order = await Orders.create({
      //   nft_id: nftId,
      //   contract_nft_id: orderData._tokenId,
      //   creator_id: req.user.id,
      //   creator_address: orderData._creator,
      //   amount: orderData._amount,
      //   price: orderData._price / Math.pow(10, 9),
      //   start_time: orderData._startTime,
      //   end_time: orderData._endTime,
      //   order_type: orderData._orderType,
      //   buyer_price: orderData._price / Math.pow(10, 9),
      //   buyer_address: orderData._buyer,
      // });
      const ownerNft = await Owners.findOne({
        where: { nft_id: orderData.nftDbId },
      });

      const prevOrders = await LazyOrders.findAll({
        where: {
          nftId: orderData.nftDbId,
          status: 1,
        },
      });

      if (prevOrders) {
        let totalOrdersAmount = 0;
        prevOrders.forEach((prevOrder) => {
          totalOrdersAmount += prevOrder.amount;
        });

        if (
          Number(ownerNft.amount) <
          Number(totalOrdersAmount) + Number(orderData.amount)
        ) {
          res.json({ result: "overflow" });
          return;
        }
      }

      const order = await LazyOrders.create({
        maker_address: orderData.maker_address,
        user_id: orderData.user_id,
        nftId: orderData.nftDbId,
        amount: orderData.amount,
        price: orderData.price,
        status: 1,
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
      const ordersData = await LazyOrders.findAll({
        where: { status: 1, nftId: nftId },
        include: [User, NFTs],
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
      // const order = await LazyOrders.update(
      //   { status: 0 },
      //   { where: { id: id } }
      // );
      const order = await LazyOrders.findOne({
        where: { id: id },
      });

      order.status = 0;
      order.save();

      if (order) {
        res.json({ result: order.nftId });
      }
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async nftMinted(req: any, res: any) {
    const { nftId, amount } = req.body;
    console.log(">>>>>>>>>>>>>", nftId, amount);
    try {
      const nft = await NFTs.findOne({
        where: { id: nftId },
        include: [Collections],
      });

      nft.minted_count += amount;
      await nft.save();

      const ownerExist = await Owners.findOne({
        where: { user_id: req.user.id, nft_id: nftId },
      });

      if (ownerExist) {
        ownerExist.amount += amount;
        await ownerExist.save();
      } else {
        const user = await User.findOne({ where: { id: req.user.id } });
        await Owners.create({
          nft_id: nftId,
          user_id: req.user.id,
          user_wallet_address: user.wallet_address,
          amount: amount,
        });
      }

      const owners = await Owners.findAll({
        where: { nft_id: nftId },
        include: [User],
      });

      const creator = await Creators.findOne({
        where: { nft_id: nftId },
        include: [User, NFTs],
      });

      res.json({ nftInfo: { ...nft.toJSON(), owners, creator } });
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: err });
    }
  }

  static async orderFinalized(req: any, res: any) {
    const { orderId, userId, amount } = req.body;
    try {
      const order = await LazyOrders.findOne({
        where: { id: orderId },
      });
      const curUser = await User.findByPk(userId);
      const prevOwner = await Owners.findOne({
        where: { nft_id: order.nftId, user_id: order.user_id },
      });

      if (!prevOwner) {
        res.status(401).json({ result: "Database error occurred!" });
        return;
      }

      if (order.amount < amount) {
        res.status(401).json({ result: "Amount exceed" });
        return;
      }

      if (order.amount == amount) {
        order.status = 0;
        await order.save();
      } else {
        prevOwner.amount -= amount;
        prevOwner.save();
        order.amount -= amount;
        order.save();
      }

      const existOwner = await Owners.findOne({
        where: {
          user_id: userId,
          nft_id: order.nftId,
        },
      });

      if (existOwner) {
        existOwner.amount += amount;
        await existOwner.save();
      } else {
        await Owners.create({
          nft_id: order.nftId,
          user_id: userId,
          user_wallet_address: curUser.wallet_address,
          amount: amount,
        });
      }
      const ordersData = await LazyOrders.findAll({
        where: {
          nftId: order.nftId,
          status: 1,
        },
      });

      const NFT = await NFTs.findOne({
        where: { id: order.nftId },
        include: [Collections],
      });
      if (!NFT) {
        res.status(422).json({ result: false });
        return;
      }

      const owners = await Owners.findAll({
        where: { nft_id: order.nftId },
        include: [User],
      });

      const creator = await Creators.findOne({
        where: { nft_id: order.nftId },
        include: [User, NFTs],
      });

      res.json({ ordersData, nftInfo: { ...NFT.toJSON(), owners, creator } });
    } catch (err) {
      console.log(err);
      res.status(401).json({ result: err });
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
    } catch (err) {
      console.log(err);
    }
  }
}
