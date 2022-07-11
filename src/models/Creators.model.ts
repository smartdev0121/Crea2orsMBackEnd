import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User.model";
import NFTs from "./NFTs.model";
@Table({
  updatedAt: false,
})
class Creators extends Model<Creators> {
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
  price: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  collection_id: number;

  @ForeignKey(() => NFTs)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  nft_id: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  user: User;

  @BelongsTo(() => NFTs, { onDelete: "CASCADE" })
  nfts: NFTs;
}

export default Creators;
