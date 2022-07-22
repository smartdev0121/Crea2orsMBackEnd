import {
  Table,
  Column,
  DataType,
  Model,
  BeforeSave,
  BeforeCreate,
} from "sequelize-typescript";

export enum UserRoles {
  ADMIN = "admin",
  AGENT = "agent",
}

@Table({
  updatedAt: false,
})
class Activity extends Model<Activity> {
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  user_id: number;

  @Column
  type: string;

  @Column
  target: string;

  @Column
  image_url: string;

  @Column
  to_address: string;
}

export default Activity;
