import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import NFTs from "./NFTs.model";
import Owners from "./Owners.model";
import User from "./User.model";

@Table({
  updatedAt: false,
})
class Collections extends Model<Collections> {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    allowNull: false,
  })
  contract_address: string;

  @Column({
    allowNull: false,
  })
  contract_uri: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    allowNull: false,
  })
  category: string;

  @Column({
    allowNull: true,
  })
  subCategory: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  token_limit: number;

  @Column({
    allowNull: false,
  })
  image_url: string;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  User: User;

  @HasMany(() => NFTs)
  nfts: NFTs[];

  @HasMany(() => Owners)
  owners: Owners[];

  static getContractsByUserId(id) {
    return Collections.findAll({
      where: { user_id: id },
    });
  }
}

export default Collections;
