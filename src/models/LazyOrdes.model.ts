import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";

import User from "./User.model";
@Table({
  updatedAt: false,
})
class LazyOrders extends Model<LazyOrders> {
  @Column({
    allowNull: false,
  })
  maker_address: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  nftId: number;

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
  status: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user: User;
}

export default LazyOrders;
