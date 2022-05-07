import {Table, Column, DataType, Model} from "sequelize-typescript"

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
    type: DataType.INTEGER
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
    type: DataType.INTEGER
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

}

export default NFTs;