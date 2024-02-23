import ScreenPermission from "../models/ScreenPermission";

import { Request, Response } from "express";
import { getScreenPermissions } from "../utils/screenPermission";
import { getScreenById } from "../utils/screen";
import { getPermissionById } from "../utils/permission";
import Screen from "../models/Screen";
import Permission from "../models/Permission";

export async function listScreenPermissions(req: Request, res: Response) {
  try {
    const screenId = Number(req.params.screenId);
    const permissions = await getScreenPermissions(screenId);

    if (!permissions) {
      res.status(404).json({
        error: "Erro ao buscar permissões, tente novamente mais tarde",
      });
    }

    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function addScreenPermission(req: Request, res: Response) {
  try {
    const screenId = Number(req.params.screenId);
    const permissionId = Number(req.params.permissionId);

    const screenPermission = await ScreenPermission.create({
      screenId,
      permissionId,
    });

    if (!screenPermission) {
      return res
        .status(400)
        .json({ error: "Erro ao adicionar permissão à tela" });
    }

    const screen = await getScreenById(screenId);

    if (!screen) {
      return res.status(404).json({
        error: "Tela não encontrada",
      });
    }

    const permission = await getPermissionById(permissionId);

    if (!permission) {
      return res.status(404).json({
        error: "Permissão não encontrada",
      });
    }

    return res.status(200).json({
      message: `${screen.name} agora é acessível para ${permission.title}`,
    });
  } catch (error: any) {
    if (error.name && error.name == "SequelizeUniqueConstraintError") {
      return res.status(403).json({ error: "Tela já possui essa permissão" });
    }
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function removeScreenPermission(req: Request, res: Response) {
  try {
    const screenId = Number(req.params.screenId);
    const permissionId = Number(req.params.permissionId);

    const screenFound = await Screen.findByPk(screenId);

    if (!screenFound) {
      return res.status(404).json({ error: "Tela não encontrada" });
    }

    const screen = screenFound.toJSON();

    const permissionFound = await Permission.findByPk(permissionId);

    if (!permissionFound) {
      return res.status(404).json({ message: "Permissão não encontrada" });
    }

    const permission = permissionFound.toJSON();

    const removed = await ScreenPermission.destroy({
      where: { screenId, permissionId },
    });

    if (!removed) {
      return res
        .status(404)
        .json({ error: "Tela já não possui essa permissão" });
    }

    return res.status(200).json({
      message: `Permissão de ${permission.title} removida de (${screen.name}) `,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
