import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  updatedAt: false,
})
class Followings extends Model<Followings> {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  following_id: number;

  static findFollowingsById(id) {
    return Followings.findAll({
      where: { user_id: id },
    });
  }
}

export default Followings;
