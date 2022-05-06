import Contracts from "../models/Contracts.model";

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
      res.json({result: true});
    } catch(err) {
      res.status(422).json({result: false});
    }
  }
}
