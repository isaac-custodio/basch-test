import { Request, Response } from "express";
import UserPermission from "../models/UserPermission";
import { getUserPermissions } from "../utils/userPermission";

export async function listUserPermissions(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const permissions = await getUserPermissions(userId);

    if (!permissions) {
      res
        .status(404)
        .json({ error: "Ocorreu um erro ao listar permissões do usuário" });
    }

    res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function addUserPermission(req: Request, res: Response) {
  try {
    const { userId, permissionId } = req.params;

    const uid = Number(userId);
    const pid = Number(permissionId);

    const created = await UserPermission.create({
      userId: uid,
      permissionId: pid,
    });

    if (!created) {
      res.status(400).json({
        error: "Ocorreu um erro ao adicioanr permissão ao usuário",
      });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function removeUserPermission(req: Request, res: Response) {
  try {
    const { userId, permissionId } = req.params;

    const deleted = await UserPermission.destroy({
      where: { permissionId, userId },
    });

    if (!deleted) {
      res.status(400).json({
        error: "Ocorreu um erro ao remover permissão do usuário",
      });
    }

    res
      .status(200)
      .json({ message: "Permissão removida com sucesso", data: deleted });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
