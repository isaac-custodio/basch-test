import sequelize from "../app/config/sequelize";

import { DataTypes, Model } from "sequelize";

export interface UserAttributes {
  id?: number;
  name?: string;
  username: string;
  password: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> {
  declare id?: number;
  declare name?: string;
  declare username: string;
  declare password: string;
  declare email?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
  }
);

export default User;
