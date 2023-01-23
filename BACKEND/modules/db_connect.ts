import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "postgres",
});

export default sequelize;
