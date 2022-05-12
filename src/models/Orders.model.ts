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

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  contract_nft_id: number;

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
    type: DataType.FLOAT,
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
  })
  start_time: number;

  @Column({
    allowNull: false,
    type: DataType.BIGINT,
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
    type: DataType.FLOAT,
  })
  buyer_price: number;

  @Column({
    allowNull: false,
  })
  buyer_address: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: 1,
  })
  status: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  User: User;

  toJSON() {
    return {
      id: this.id,
      nftId: this.nft_id,
      contractNftId: this.contract_nft_id,
      creatorId: this.creator_id,
      creatorAddress: this.creator_address,
      amount: this.amount,
      price: this.price,
      startTime: this.start_time,
      endTime: this.end_time,
      maxBidPrice: this.buyer_price,
      buyerAddress: this.buyer_address,
      orderType: this.order_type,
      User: this.User,
    };
  }
}

export default Orders;
