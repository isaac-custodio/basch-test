import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const { DB_PASSWORD, DB_USER, DB_NAME, DB_HOST } = process.env;

if (!DB_PASSWORD) {
  throw new Error("DB_PASSWORD is missing in .env");
}

if (!DB_USER) {
  throw new Error("DB_USER is missing in .env");
}

if (!DB_NAME) {
  throw new Error("DB_NAME is missing in .env");
}

if (!DB_HOST) {
  throw new Error("DB_NAME is missing in .env");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

sequelize.sync({ alter: true });

export default sequelize;
