import sequelize from "../app/config/sequelize";

import { DataTypes, Model } from "sequelize";

export interface PermissionAttributes {
  id?: number;
  description: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Permission extends Model<PermissionAttributes> {
  declare id?: number;
  declare title: string;
  declare description: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
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
