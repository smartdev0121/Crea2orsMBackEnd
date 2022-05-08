import Contracts from "../models/Contracts.model";
import NFTs from "../models/NFTs.model";

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
    const { contractId, metaData, metaDataUri, fileUri } = req.body;

    try {
      const NFT = await NFTs.create({
        contract_id: contractId,
        metadata_url: metaDataUri,
        name: metaData.name,
        description: metaData.description,
        batch_size: metaData.batchSize,
        price: metaData.price,
        alter_text: metaData.alterText,
        royalty_fee: metaData.royaltyFee,
        file_url: fileUri,
        traits: JSON.stringify(metaData.traits),
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
      });

      if (!NFT) {
        res.status(422).json({ result: false });
        return;
      }
      res.json({ ...NFT.toJSON() });
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
}
