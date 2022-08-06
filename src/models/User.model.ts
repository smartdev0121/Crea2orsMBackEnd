import bcrypt from "bcryptjs";
import randtoken from "rand-token";
import {
  Table,
  Column,
  DataType,
  Model,
  BeforeSave,
  BeforeCreate,
  HasMany,
} from "sequelize-typescript";
import Collections from "./Collections.model";
import Owners from "./Owners.model";

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
  })
  wallet_address: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  bio: string;

  @Column({
    allowNull: true,
  })
  custom_url: string;

  @Column({
    allowNull: true,
  })
  personal_site: string;

  @Column({
    allowNull: true,
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
    allowNull: true,
  })
  nick_name: string;

  @Column({
    allowNull: true,
  })
  twitter_username: string;

  @Column({
    allowNull: true,
  })
  facebook_username: string;

  @Column({
    allowNull: true,
  })
  instagram_username: string;

  get fullName() {
    return `${this.nick_name}`;
  }

  @Column({
    defaultValue: false,
    type: DataType.TINYINT,
  })
  verified: number;

  @Column
  reset_token: string;

  @Column({
    allowNull: true,
  })
  background_image_url: string;

  @Column({
    allowNull: true,
  })
  followers_num: number;

  @Column({
    allowNull: true,
  })
  followings_num: number;

  @Column
  verification_token: string;

  @HasMany(() => Collections, "user_id")
  collections: Collections[];

  @HasMany(() => Owners, "user_id")
  owned: Owners[];

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  toJSON() {
    return {
      id: this.id,
      nickName: this.nick_name,
      walletAddress: this.wallet_address,
      role: this.role,
      bio: this.bio,
      customUrl: this.custom_url,
      personalSite: this.personal_site,
      avatar_url: this.avatar_url,
      verified: this.verified,
      backgroundImageUrl: this.background_image_url,
      followers_num: this.followers_num,
      followings_num: this.followings_num,
      collections: this.collections,
      twitter_username: this.twitter_username,
      facebook_username: this.facebook_username,
      instagram_username: this.instagram_username,
      owned: this.owned,
    };
  }

  static findByCustomUrl(url) {
    return User.findOne({
      where: { custom_url: url },
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
