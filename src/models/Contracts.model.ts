import {
  Table,
  Column,
  DataType,
  Model,
  BeforeCreate,
  BeforeSave,
} from "sequelize-typescript";

@Table({
  updatedAt: false,
})
class Contracts extends Model<Contracts> {
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
  })
  description: string;

  @Column({
    allowNull: false,
  })
  category: string;

  @Column({
    allowNull: false,
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

  static getContractsByUserId(id) {
    return Contracts.findAll({
      where: { user_id: id },
    });
  }
}

export default Contracts;
