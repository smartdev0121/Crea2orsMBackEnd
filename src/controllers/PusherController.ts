import pusher from "../services/pusher";

export default class PusherController {
  static async auth(req, res) {
    console.log("pusher=====");
    const { user, body } = req;
    const socketId = body.socket_id;
    const channel = body.channel_name;
    const auth = pusher.authenticate(socketId, channel, {
      user_id: user.id,
    });
    res.send(auth);
  }
}
