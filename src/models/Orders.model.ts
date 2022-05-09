import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User.model";

@Table({
  updatedAt: false,
})
class Orders extends Model<Orders> {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  nft_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  creator_id: number;

  @Column({
    allowNull: false,
  })
  creator_address: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  amount: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  start_time: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  end_time: number;

  //order-type
  //0: Fixed price
  //1: Aution price
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  order_type: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER
  })
  max_bid_price: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  User: User;

  toJSON () {
    return {
      id: this.id,
      nftId: this.nft_id,
      creatorId: this.creator_id,
      creatorAddress: this.creator_address,
      amount: this.amount,
      price: this.price,
      startTime: this.start_time,
      endTime: this.end_time,
      maxBidPrice: this.max_bid_price,
      orderType: this.order_type,
      User: this.User,
    }
  }

}

export default Orders;
