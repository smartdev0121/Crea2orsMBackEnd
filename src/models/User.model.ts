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
class User extends Model<User> {
  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM("admin", "agent"),
    defaultValue: UserRoles.AGENT,
  })
  role: UserRoles;

  @Column({
    allowNull: false,
  })
  firstName: string;

  @Column({
    allowNull: false,
  })
  lastName: string;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Column({
    defaultValue: false,
  })
  verified: boolean;

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
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      role: this.role,
    };
  }

  static findByEmail(email) {
    return User.findOne({
      where: { email },
    });
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

export default User;
