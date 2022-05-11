import Orders from "src/models/Orders.model";
export default async () => {
  setInterval(async () => {
    const orders = await Orders.findAll();
    const curMiliTime = new Date().getTime();
    const curTime = Math.round(curMiliTime / 1000);
    console.log(curTime);
    orders.forEach((item) => {
      if (curTime > item.end_time) {
        console.log("Ended", item.id);
      }
    });
  }, 1000);
};
