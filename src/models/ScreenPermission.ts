import { Model, DataTypes } from "sequelize";

import sequelize from "../app/config/sequelize";

interface ScreenPermissionAttributes {
  screenId: number;
  permissionId: number;
}

class ScreenPermission
  extends Model<ScreenPermissionAttributes>
  implements ScreenPermissionAttributes
{
  public screenId!: number;
  public permissionId!: number;
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
