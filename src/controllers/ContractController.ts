import Contracts from "../models/Contracts.model";
import NFTs from "../models/NFTs.model";

export default class ContractController {
  static async saveContractInformation(req, res) {
    const { contractUri, contractAddress } = req.body;
    console.log(contractUri, contractAddress);
    try {
      const contract = await Contracts.create({
        user_id: req.user.id,
        contract_address: contractAddress,
        contract_uri: contractUri,
      });
      res.json({ result: true });
    } catch (err) {
      res.status(422).json({ result: false });
    }
  }

  static async getContractUri(req, res) {
    const contractAddress = req.params.contractAddress;
    console.log("contractAddress", contractAddress);

    const contract = await Contracts.findOne({
      where: { contract_address: contractAddress },
    });
    console.log(contract.contract_uri);
    if (contract) {
      res.json({ id: contract.id, contractUri: contract.contract_uri });
    } else {
      res.status(422).json({ result: false });
    }
  }

  static async createNFT(req, res) {
    const {contractId, metaData, metaDataUri, fileUri} = req.body;

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

      res.json({name: NFT.name});
    } catch (err) {
      console.log(err);
      res.status(422).json({result: false});
    }
    


  }
}
