import Permission, { PermissionAttributes } from "../models/Permission";

export async function getPermissionById(id: number) {
  try {
    const found = await Permission.findByPk(id);

    if (!found) {
      return undefined;
    }

    return found.toJSON();
  } catch (error) {
    return undefined;
  }
}

export async function getAllPermissions() {
  try {
    const found = await Permission.findAll();

    const permissions = found.map((permission) => {
      return permission && permission.toJSON();
    });

    return permissions;
  } catch (error) {
    return undefined;
  }
}
