import sequelize from "../app/config/sequelize";

import { DataTypes, Model } from "sequelize";

interface UserPermissionAttributes {
  userId: number;
  permissionId: number;
}

class UserPermission extends Model<UserPermissionAttributes> {
  declare userId: number;
  declare permissionId: number;
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
