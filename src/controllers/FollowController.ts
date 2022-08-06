import User from "../models/User.model";
import Followers from "../models/Followers.model";
import Followings from "../models/Followings.model";

export default class FollowController {
  // static async delete(req: any, res: any) {
  // const email = req.body.email;
  // const curUserId = req.user.id;
  // const user = await User.findByEmail(email);
  // const id = user.id;
  // const follower = await Followers.findOne({
  //   where: { follower_id: curUserId, user_id: id },
  // }).then(async (result) => {
  //   const u = await Followers.destroy({
  //     where: { follower_id: curUserId, user_id: id },
  //   });
  //   return result;
  // });
  // const following = await Followings.findOne({
  //   where: { user_id: curUserId, following_id: id },
  // }).then(async (result) => {
  //   const u = await Followings.destroy({
  //     where: { user_id: curUserId, following_id: id },
  //   });
  //   return result;
  // });
  // res.json({ follower: follower });
  // }
  // static async insert(req: any, res: any) {
  // const email = req.body.email;
  // const curUserId = req.user.id;
  // const user = await User.findByEmail(email);
  // const id = user.id;
  // const duplicate = await Followers.findOne({
  //   where: { user_id: id, follower_id: curUserId },
  // });
  // if (duplicate) {
  //   res.status(422).json({ result: "duplicate" });
  //   return;
  // }
  // await Followers.create({
  //   user_id: id,
  //   follower_id: curUserId,
  // });
  // await Followings.create({
  //   user_id: curUserId,
  //   following_id: id,
  // });
  // const followers = await Followers.findFollowersById(id);
  // const followings = await Followings.findFollowingsById(id);
  // res.json({ followers: followers, followings: followings });
  // }
}
