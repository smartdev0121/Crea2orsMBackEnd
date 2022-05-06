
import {Table, Column, DataType, Model, BeforeCreate, BeforeSave} from "sequelize-typescript"

@Table({
  updatedAt: false,
})

class Contracts extends Model<Contracts> {
  @Column ({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column ({
    allowNull: false,
  })
  contract_address: string;

  @Column ({
    allowNull: false,
  })
  contract_uri: string;

  static getContractsByUserId(id) {
    return Contracts.findAll({
      where: {user_id: id},
    })
  }
}

export default Contracts;