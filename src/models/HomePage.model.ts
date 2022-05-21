import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Collections from "./Collections.model";

@Table({
  updatedAt: false,
})
class HomePage extends Model<HomePage> {
  @ForeignKey(() => Collections)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  collection_id: number;

  @Column({
    allowNull: false,
  })
  category: string;

  @Column({
    allowNull: false,
  })
  mode: string;

  @BelongsTo(() => Collections, { onDelete: "CASCADE" })
  Collections: Collections;
}

export default HomePage;
