import Permission from "../models/Permission";

export async function getPermissionById(id: number) {
  try {
    const permission = await Permission.findByPk(id);

    if (!permission) {
      throw {
        error: "Não foi possível encontrar essa permissão",
      };
    }

    return { ...permission };
  } catch (error) {
    console.error(error);

    throw {
      error: "Erro interno no servidor",
    };
  }
}
