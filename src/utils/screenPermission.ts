import Permission, { PermissionAttributes } from "../models/Permission";
import ScreenPermission from "../models/ScreenPermission";

export async function getScreenPermissions(
  screenId: number
): Promise<PermissionAttributes[] | undefined> {
  try {
    const foundScreenPermissions = await ScreenPermission.findAll({
      where: {
        screenId,
      },
    });

    if (!foundScreenPermissions) {
      return undefined;
    }

    const screenPermissions = foundScreenPermissions.map((up) => up.toJSON());
    const permissions = await Promise.all(
      screenPermissions.map(async (p) => {
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
