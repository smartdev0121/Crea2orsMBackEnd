import { Sequelize } from "sequelize-typescript";
import config from "../../config";

const sequelize = new Sequelize({
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  host: config.DB_HOST,
  dialect: config.DB_CONNECTION,
  modelPaths: [__dirname + "/**/*.model.{ts, js}"],
  logging: false,
});
sequelize
  .sync({ force: false })
  .then((res) => {})
  .catch((err) => console.log("==========", err));

export default sequelize;
