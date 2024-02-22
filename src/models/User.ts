import sequelize from "../app/config/sequelize";

import { DataTypes, Model } from "sequelize";

export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  email?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email?: string;
  public name?: string;
  public created_at?: Date;
  public updated_at?: Date;
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
