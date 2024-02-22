import sequelize from "../app/config/sequelize";
import Screen from "./Screen";
import User from "./User";

import { DataTypes, Model } from "sequelize";

export interface PermissionAttributes {
  id?: number;
  description: string;
  title: string;
  created_at?: Date;
  updated_at?: Date;
}

class Permission
  extends Model<PermissionAttributes>
  implements PermissionAttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public created_at?: Date;
  public updated_at?: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Permission",
    tableName: "permissions",
    timestamps: true,
    underscored: true,
  }
);

export default Permission;
