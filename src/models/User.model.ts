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
    allowNull: true,
  })
  bio: string;

  @Column({
    allowNull: true,
  })
  customUrl: string;

  @Column({
    allowNull: true,
  })
  personalSite: string;

  @Column({
    allowNull: false,
  })
  password: string;

  @Column({
    allowNull: true,
  })
  avatar_url: string;

  @Column({
    type: DataType.ENUM("admin", "agent"),
    defaultValue: UserRoles.AGENT,
  })
  role: UserRoles;

  @Column({
    allowNull: false,
  })
  nickName: string;

  get fullName() {
    return `${this.nickName}`;
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
      nickName: this.nickName,
      fullName: this.fullName,
      role: this.role,
      bio: this.bio,
      customUrl: this.customUrl,
      personalSite: this.personalSite,
      avatar_url: this.avatar_url,
      verified: this.verified,
    };
  }

  static findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }

  static updateProfileBackground(req, res) {}

  static findByCustomUrl(url) {
    return User.findOne({
      where: { customUrl: url },
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
