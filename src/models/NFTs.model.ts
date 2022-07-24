import {
  Table,
  Column,
  DataType,
  Model,
  BelongsTo,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import Contracts from "./Collections.model";
import LazyOrders from "./LazyOrdes.model";

@Table({
  updatedAt: false,
})
class NFTs extends Model<NFTs> {
  @ForeignKey(() => Contracts)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  contract_id: number;

  @Column({
    allowNull: false,
  })
  metadata_url: string;

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
    type: DataType.INTEGER,
  })
  batch_size: number;

  @Column({
    allowNull: true,
    defaultValue: 0,
    type: DataType.INTEGER,
  })
  minted_count: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  nft_id: number;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  alter_text: string;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  signature: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  royalty_fee: number;

  @Column({
    allowNull: false,
  })
  file_url: string;

  @Column({
    allowNull: false,
  })
  traits: string;

  @BelongsTo(() => Contracts, { onDelete: "CASCADE" })
  Contracts: Contracts;

  @HasOne(() => LazyOrders)
  toJSON() {
    return {
      id: this.id,
      contractId: this.contract_id,
      metaDataUrl: this.metadata_url,
      name: this.name,
      description: this.description,
      batchSize: this.batch_size,
      alterText: this.alter_text,
      royaltyFee: this.royalty_fee,
      fileUrl: this.file_url,
      traits: this.traits,
      nftId: this.nft_id,
      Contract: this.Contracts,
    };
  }
}

export default NFTs;
