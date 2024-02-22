import { Request, Response } from "express";
import ScreenPermission from "../models/ScreenPermission";
import { getScreenPermissions } from "../utils/screenPermission";
import { getScreenById } from "../utils/screen";
import { getPermissionById } from "../utils/permission";

export async function listScreenPermissions(req: Request, res: Response) {
  try {
    const { screenId } = req.params;
    const permissions = await getScreenPermissions(screenId);

    if (!permissions) {
      res.status(404).json({ error: "Nada encontrado" });
    }

    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function addScreenPermission(req: Request, res: Response) {
  try {
    const { screenId, permissionId } = req.params;

    const sid = Number(screenId);
    const pid = Number(permissionId);

    const screenPermission = await ScreenPermission.create({
      screenId: sid,
      permissionId: pid,
    });

    if (!screenPermission) {
      res.status(400).json({ error: "Erro ao adicionar permissão a tela" });
    }

    const screen = await getScreenById(sid);
    const permission = await getPermissionById(pid);

    res.status(200).json({
      message: "Permissão adicionada com sucesso à tela",
      screen,
      permission,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function removeScreenPermission(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
