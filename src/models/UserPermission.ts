import sequelize from "../app/config/sequelize";

import { DataTypes, Model } from "sequelize";

interface UserPermissionAttributes {
  userId: number;
  permissionId: number;
}

class UserPermission
  extends Model<UserPermissionAttributes>
  implements UserPermissionAttributes
{
  public userId!: number;
  public permissionId!: number;
}

UserPermission.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "UserPermission",
    tableName: "user_permissions",
    timestamps: false,
    underscored: true,
  }
);

export default UserPermission;
