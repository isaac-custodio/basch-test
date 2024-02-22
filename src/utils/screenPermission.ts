import Permission from "../models/Permission";
import ScreenPermission from "../models/ScreenPermission";
import UserPermission from "../models/UserPermission";

export async function getScreenPermissions(
  screenId: string
): Promise<Permission[]> {
  try {
    const screenPermissions = await ScreenPermission.findAll({
      where: {
        screenId,
      },
    });

    var permissions: Permission[] = [];

    screenPermissions.map(async (sp) => {
      const permission = await Permission.findByPk(sp.screenId);
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
