import Web3 from "web3";
import abi from "../contract/Crea2orsManager/Crea2orsManager.js";
import BigNumber from "bignumber.js";
const privateKey =
  "d66aba8c241e5a647577ea9410a7cd783b02a87f52b21df92761487350bcf2e6";
const address = "0x462FbDbC8c5D08480b87A7B9729674DA851e8Ff3";
const marketContractAddress = "0xFde70d1f065c62b35a0B234832C03D7C0CC24ce7";

const web3 = new Web3("https://chainrpc.com");

const myContract = new web3.eth.Contract(abi, marketContractAddress);
export const calculatePrice = (price, decimal) => {
  return web3.utils
    .toBN(BigNumber(price).times(BigNumber(10).pow(BigNumber(decimal))))
    .toString();
};

export const sendFinalizeOrderFunc = async (order) =>
  new Promise(async (resolve, reject) => {
    const tx = myContract.methods.finalizeOrder(order);
    const networkId = await web3.eth.net.getId();

    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nounce = await web3.eth.getTransactionCount(address);
    console.log(gas, gasPrice, nounce);
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
    console.log("MMMMMMMMMMMMMMMMMMMMM");
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(">>>>>>>>><<<<<<<<<<<<<<<<<", receipt);
    const events = await getEvent("OrderFinalized");

    const orderData = getEventValue(events);
    console.log("Here is orderData>>>>>>>>>>>>>>>>", events);
    return resolve({});
  });

const getEvent = async (eventName) =>
  new Promise(async (resolve, reject) => {
    let latest_block = await web3.eth.getBlockNumber();
    let historical_block = latest_block - 10000;
    console.log("Block number", latest_block, historical_block);

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
