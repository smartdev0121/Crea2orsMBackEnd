import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  updatedAt: false,
})
class NFTs extends Model<NFTs> {
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
  })
  description: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  batch_size: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    allowNull: true,
  })
  alter_text: string;

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

  toJSON() {
    return {
      id: this.id,
      contractId: this.contract_id,
      metaDataUrl: this.metadata_url,
      name: this.name,
      description: this.description,
      batchSize: this.batch_size,
      price: this.price,
      alterText: this.alter_text,
      royaltyFee: this.royalty_fee,
      fileUrl: this.file_url,
      traits: this.traits,
    };
  }
}

export default NFTs;
