import bcrypt from "bcryptjs";
import randtoken from "rand-token";
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
class AdminUser extends Model<AdminUser> {
  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: false,
  })
  username: string;

  @Column({
    defaultValue: false,
    type: DataType.TINYINT,
  })
  verified: number;

  @Column
  reset_token: string;

  @Column
  verification_token: string;

  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
    };
  }

  @BeforeSave
  static async hashPassword(user) {
    user.password = user.password || randtoken.generate(10);
    if (user.changed("password")) {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
    }
  }

  @BeforeCreate
  static async setResetToken(user) {
    user.reset_token = randtoken.generate(50);
  }
}

export default AdminUser;
