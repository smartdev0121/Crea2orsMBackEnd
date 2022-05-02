import {
  Table,
  Column,
  DataType,
  Model,
  BeforeSave,
  BeforeCreate,
} from "sequelize-typescript";

@Table({
  updatedAt: false,
})
class Followers extends Model<Followers> {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;
}
