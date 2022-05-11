import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  updatedAt: false,
})
class Followers extends Model<Followers> {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  follower_id: number;

  static findFollowersById(id) {
    return Followers.findAll({
      where: { user_id: id },
    });
  }
}

export default Followers;
