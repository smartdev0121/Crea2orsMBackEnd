import Contracts from "../models/Contracts.model";
import NFTs from "../models/NFTs.model";
import Owners from "../models/Owners.model";
import User from "../models/User.model";
import Orders from "../models/Orders.model";

export default class ContractController {
  static async saveContractInformation(req, res) {
    const { contractUri, contractAddress, metaData, imageUri } = req.body;
    console.log(contractUri, contractAddress);
    try {
      const contract = await Contracts.create({
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

      res.json({ result: true });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getContractUri(req, res) {
    const contractAddress = req.params.contractAddress;
    console.log("contractAddress", contractAddress);

    const contract = await Contracts.findOne({
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

  static async createNFT(req, res) {
    const { contractId, metaData, metaDataUri, fileUri, nftId } = req.body;
    console.log(nftId);
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
        amount: metaData.batchSize,
      });

      res.json({ nftId: NFT.id, name: NFT.name });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async getNFT(req, res) {
    const nftId = req.params.nftId;
    try {
      const NFT = await NFTs.findOne({
        where: { id: nftId },
        include: [Contracts],
      });

      const owners = await Owners.findAll({
        where: { nft_id: NFT.nft_id },
        include: [User],
      });
      console.log(owners);

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

  static async getUserCollections(req, res) {
    const userId = req.user.id;

    try {
      const collections = await Contracts.findAll({
        where: { user_id: userId },
      });
      console.log(collections);
      res.json({ collections });
    } catch (err) {
      console.log(err);
      res.status(422).json({ result: false });
    }
  }

  static async orderCreated(req, res) {
    const { orderData } = req.body;
    try {
      const order = await Orders.create({
        nft_id: orderData._tokenId,
        creator_id: req.user.id,
        creator_address: orderData._creator,
        amount: orderData._amount,
        price: orderData._price,
        start_time: orderData._startTime,
        end_time: orderData._endTime,
        order_type: orderData._orderType,
        max_bid_price: -1
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

  static async getOrders(req, res) {
    try {
      const ordersData = await Orders.findAll(
        {include: [User]}
      );
      console.log(ordersData);
      res.json({ordersData: ordersData});
    } catch(err) {
      res.status(422).json({result: false});
      console.log(err)
    }

  }
}
