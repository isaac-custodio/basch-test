import User from "../models/User";
import Permission from "../models/Permission";

import { Request, Response } from "express";
import UserPermission from "../models/UserPermission";
import { getUserPermissions } from "../utils/userPermission";

export async function listUserPermissions(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);

    const permissions = await getUserPermissions(userId);

    if (!permissions) {
      res
        .status(404)
        .json({ error: "Ocorreu um erro ao listar permissões do usuário" });
    }

    return res.status(200).json(permissions);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function addUserPermission(req: Request, res: Response) {
  try {
    const userId = Number(req.params.userId);
    const permissionId = Number(req.params.permissionId);

    const userExists = await User.findByPk(userId);

    if (!userExists) {
      return res
        .status(404)
        .json({ error: "Id de usuário fornecido é inválido" });
    }

    const user = userExists.toJSON();

    const permissionExists = await Permission.findByPk(permissionId);

    if (!permissionExists) {
      return res
        .status(404)
        .json({ error: "Id de permissão fornecido é inválido" });
    }

    const permission = permissionExists.toJSON();

    const added = await UserPermission.create({
      userId,
      permissionId,
    });

    if (!added) {
      return res.status(400).json({
        error: "Ocorreu um erro ao adicionar permissão ao usuário",
      });
    }

    return res.status(200).json({
      message: `${user.username} agora tem permissão de ${permission.title}`,
    });
  } catch (error: any) {
    if (error.name && error.name == "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ error: "Este usuário já possui essa permissão" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function removeUserPermission(req: Request, res: Response) {
  try {
    const { userId, permissionId } = req.params;

    const deleted = await UserPermission.destroy({
      where: { permissionId, userId },
    });

    if (!deleted) {
      return res.status(404).json({
        error: "Usuário já não possui esta permissão",
      });
    }

    return res.status(200).json({ message: "Permissão removida com sucesso" });
  } catch (error: any) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
