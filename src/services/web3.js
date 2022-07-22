import Web3 from "web3";
import abi from "../contract/Crea2orsManager/Crea2orsManager.js";
import cr2Abi from "../contract/Crea2orsManager/CR2ContractABI.js";
import BigNumber from "bignumber.js";

const pk_MarketPlaceWallet =
  "d66aba8c241e5a647577ea9410a7cd783b02a87f52b21df92761487350bcf2e6";
const pb_MarketPlaceWallet = "0x462FbDbC8c5D08480b87A7B9729674DA851e8Ff3";
const marketContractAddress = "0xFde70d1f065c62b35a0B234832C03D7C0CC24ce7";
const pk_RewardWallet =
  "2f7fe23493f9aa874bb4f455a5ab6f74c17f486a0596c17185072216bffce829";
const pb_RewardWallet = "0x26810913499451a31a9E17C0b021b326C0a73c94";

const cr2_contractAddress = "0xcaa395E63Eaf26bb65fF906ccC9F3752594b614B";
const web3 = new Web3("https://chainrpc.com");

const myContract = new web3.eth.Contract(abi, marketContractAddress);
const cr2Contract = new web3.eth.Contract(cr2Abi, cr2_contractAddress);

export const calculatePrice = (price, decimal) => {
  return web3.utils
    .toBN(BigNumber(price).times(BigNumber(10).pow(BigNumber(decimal))))
    .toString();
};

export const sendCR2RewardToNewWallet = async (newWalletAddress, amount) =>
  new Promise(async (resolve, reject) => {
    try {
      const cr2Amount = calculatePrice(amount, 9);
      const tx = cr2Contract.methods.transfer(newWalletAddress, cr2Amount);

      const networkId = await web3.eth.net.getId();

      const gas = await tx.estimateGas({ from: pb_RewardWallet });

      const gasPrice = await web3.eth.getGasPrice();
      const data = tx.encodeABI();
      const nounce = await web3.eth.getTransactionCount(pb_RewardWallet);

      const signedTx = await web3.eth.accounts.signTransaction(
        {
          to: cr2_contractAddress,
          from: pb_RewardWallet,
          data,
          gas,
          gasPrice,
          nounce,
          chainId: networkId,
        },
        pk_RewardWallet
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      resolve({ result: true });
    } catch (err) {
      console.log(err);
      reject({ result: false });
    }
  });

export const sendFinalizeOrderFunc = async (order) =>
  new Promise(async (resolve, reject) => {
    const tx = myContract.methods.finalizeOrder(order);
    const networkId = await web3.eth.net.getId();
    const address = order[0];
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nounce = await web3.eth.getTransactionCount(address);
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: marketContractAddress,
        data,
        gas,
        gasPrice,
        nounce,
        chainId: networkId,
      },
      privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    const events = await getEvent("OrderFinalized");

    const orderData = getEventValue(events);
    return resolve({});
  });

const getEvent = async (eventName) =>
  new Promise(async (resolve, reject) => {
    let latest_block = await web3.eth.getBlockNumber();
    let historical_block = latest_block - 10000;

    const events = await myContract.getPastEvents(eventName, {
      fromBlock: historical_block,
      toBlock: "latest",
    });

    return resolve(events);
  });

const getEventValue = (events) => {
  let curData;
  for (let i = 0; i < events.length; i++) {
    let sender = events[i]["returnValues"]["to"];
    if (sender == address) {
      curData = events[i]["returnValues"];
    }
  }
  return curData;
};

export const sendBriseRewardToNewWallet = async (newWalletAddress, amount) =>
  new Promise(async (resolve, reject) => {
    try {
      const briseAmount = calculatePrice(amount, 18);
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          to: newWalletAddress,
          from: pb_RewardWallet,
          value: briseAmount,
          gas: 2000000,
        },
        pk_RewardWallet
      );

      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      return resolve({ result: true });
    } catch (err) {
      console.log(">>>>>>>>>>>>>>>> brise error.................", err);
      return reject({ result: false });
    }
  });
