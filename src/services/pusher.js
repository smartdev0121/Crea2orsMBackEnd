import Pusher from "pusher";
import config from "../config";

var pusher = new Pusher({
  appId: config.PUSHER_APP_ID,
  key: config.PUSHER_KEY,
  secret: config.PUSHER_SECRET,
  cluster: config.PUSHER_CLUSTER,
});

export default pusher;
