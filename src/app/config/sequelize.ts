import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const { DB_PASSWORD, DB_USER } = process.env;

if (!DB_PASSWORD) {
  throw new Error("DB_PASSWORD is missing in .env");
}

if (!DB_USER) {
  throw new Error("DB_USER is missing in .env");
}

const sequelize = new Sequelize("basch_test_db", DB_USER, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

sequelize.sync({ alter: true });

export default sequelize;
