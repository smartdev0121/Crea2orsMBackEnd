import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Collections from "./Collections.model";
import NFTs from "./NFTs.model";
import User from "./User.model";

@Table({
  updatedAt: false,
})
class Owners extends Model<Owners> {
  @ForeignKey(() => NFTs)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  nft_id: number;

  @ForeignKey(() => Collections)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
  })
  collection_id: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  user_wallet_address: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  amount: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  User: User;

  @BelongsTo(() => NFTs, "nft_id")
  nfts: NFTs;

  @BelongsTo(() => Collections, { onDelete: "CASCADE" })
  collections: Collections;
}

export default Owners;
