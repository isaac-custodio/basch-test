import Permission from "../models/Permission";
import UserPermission from "../models/UserPermission";

export async function getUserPermissions(
  userId: string
): Promise<Permission[]> {
  try {
    const userPermissions = await UserPermission.findAll({
      where: {
        userId,
      },
    });

    var permissions: Permission[] = [];

    userPermissions.map(async (up) => {
      const permission = await Permission.findByPk(up.permissionId);
      if (!permission) return;
      permissions.push(permission);
    });

    return permissions;
  } catch (error) {
    throw {
      error: "Ocorreu um erro ao buscar permissões deste usuário",
    };
  }
}
