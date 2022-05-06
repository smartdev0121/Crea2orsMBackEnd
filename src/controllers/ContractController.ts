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

    if (contract) {
      res.json({ contractUri: contract.contract_uri });
    } else {
      res.status(422).json({ result: false });
    }
  }
}
