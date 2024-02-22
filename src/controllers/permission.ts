import type { Request, Response } from "express";
import Permission, { PermissionAttributes } from "../models/Permission";
import { getUserById } from "../utils/user";
import { Session } from "express-session";
import User from "../models/User";
import UserPermission from "../models/UserPermission";

export async function addPermission({ body }: Request, res: Response) {
  try {
    const { description, title }: PermissionAttributes = body;
    const permission = await Permission.create({ description, title });
    return res
      .status(200)
      .json({ message: "Permissão adicionada com sucesso!", data: permission });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function updatePermission(
  { body, params }: Request,
  res: Response
) {
  try {
    const id: string = params.id;

    const { description, title }: PermissionAttributes = body;

    const updated = await Permission.update(
      { description, title },
      { where: { id } }
    );

    return res
      .status(200)
      .json({ message: "Permissão adicionada com sucesso!", data: updated });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function removePermission(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function listPermissions(req: Request, res: Response) {
  try {
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function findPermissionById(req: Request, res: Response) {
  try {
    const id: string = req.params.id;

    const permission = await Permission.findByPk(id);

    if (!permission) {
      res.status(404).json({ error: "Permissão não encontrada" });
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
