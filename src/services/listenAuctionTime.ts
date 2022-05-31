import Orders from "src/models/Orders.model";
import Collections from "src/models/Collections.model";
import { sendFinalizeOrderFunc, calculatePrice } from "src/services/web3";
import NFTs from "src/models/NFTs.model";

export default async () => {
  // const orders = await Orders.findAll();
  const orders = [];

  setInterval(async () => {
    const curMiliTime = new Date().getTime();
    const curTime = Math.round(curMiliTime / 1000);
    orders
      .filter((item) => item.status == 1)
      .forEach(async (item) => {
        if (curTime > item.end_time) {
          if (item.status == 0) {
          }
          const nft = await NFTs.findOne({
            where: { id: item.nft_id },
          });
          const collection = await Collections.findOne({
            where: { id: nft.contract_id },
          });
          const order = [
            item.creator_address,
            collection.contract_address,
            item.contract_nft_id,
            item.amount,
            calculatePrice(item.price, 9),
            item.start_time,
            item.end_time,
            item.order_type,
            item.buyer_address,
            calculatePrice(item.buyer_price, 9),
          ];
          await sendFinalizeOrderFunc(order);
          const finalizedOrder = await Orders.findOne({
            where: { id: item.id },
          });
          finalizedOrder.status = 0;
          await finalizedOrder.save();
        }
      });
  }, 2000);
};
