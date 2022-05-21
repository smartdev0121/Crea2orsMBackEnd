import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  updatedAt: false,
})
class Category extends Model<Category> {
  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  parent_id: number;

  @Column({
    allowNull: true,
  })
  icon_url: string;
}

export default Category;
