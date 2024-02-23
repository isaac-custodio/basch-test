import sequelize from "../app/config/sequelize";

import { DataTypes, Model } from "sequelize";

export interface ScreenAttributes {
  id?: number;
  name: string;
  description?: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Screen extends Model<ScreenAttributes> {
  declare id?: number;
  declare name: string;
  declare description?: string;
  declare url: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Screen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Screen",
    tableName: "screens",
    timestamps: true,
    underscored: true,
  }
);

export default Screen;
