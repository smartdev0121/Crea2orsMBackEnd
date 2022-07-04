import { Table, Column, DataType, Model } from "sequelize-typescript";

@Table({
  updatedAt: false,
})
class Report extends Model<Report> {
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
}

export default Report;
