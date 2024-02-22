import sequelize from "../app/config/sequelize";

import { DataTypes, Model } from "sequelize";

export interface ScreenAttributes {
  id?: number;
  name: string;
  description?: string;
  url: string;
  created_at?: Date;
  updated_at?: Date;
}

class Screen extends Model<ScreenAttributes> implements ScreenAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public url!: string;
  public created_at?: Date;
  public updated_at?: Date;
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
