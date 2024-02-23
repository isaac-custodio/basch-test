import Permission, { PermissionAttributes } from "../models/Permission";
import UserPermission from "../models/UserPermission";

export async function getUserPermissions(
  userId: number
): Promise<PermissionAttributes[] | undefined> {
  try {
    const foundUserPermissions = await UserPermission.findAll({
      where: {
        userId,
      },
    });

    if (!foundUserPermissions) {
      return undefined;
    }

    const userPermissions = foundUserPermissions.map((up) => up.toJSON());
    const permissions = await Promise.all(
      userPermissions.map(async (p) => {
        const permission = await Permission.findByPk(p.permissionId);
        return permission ? permission.toJSON() : null;
      })
    );

    return permissions.filter(
      (permission) => permission !== null
    ) as PermissionAttributes[];
  } catch (error) {
    return undefined;
  }
}
