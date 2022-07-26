import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User.model";

@Table({
  updatedAt: false,
})
class Report extends Model<Report> {
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
  })
  content: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  report_user_id: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  status: number;

  @BelongsTo(() => User, { onDelete: "CASCADE", foreignKey: "user_id" })
  user: User;

  @BelongsTo(() => User, { onDelete: "CASCADE", foreignKey: "report_user_id" })
  reportUser: User;
}

export default Report;
