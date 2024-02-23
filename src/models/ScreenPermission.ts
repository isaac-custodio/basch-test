import { Model, DataTypes } from "sequelize";

import sequelize from "../app/config/sequelize";

interface ScreenPermissionAttributes {
  screenId: number;
  permissionId: number;
}

class ScreenPermission extends Model<ScreenPermissionAttributes> {
  declare screenId: number;
  declare permissionId: number;
}

ScreenPermission.init(
  {
    permissionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    screenId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ScreenPermission",
    tableName: "screen_permissions",
  }
);

export default ScreenPermission;
