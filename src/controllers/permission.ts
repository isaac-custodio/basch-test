import Permission, { PermissionAttributes } from "../models/Permission";

import type { Request, Response } from "express";
import { getAllPermissions } from "../utils/permission";

export async function addPermission({ body }: Request, res: Response) {
  try {
    const { description, title }: PermissionAttributes = body;
    const permission = await Permission.create({ description, title });
    return res.status(200).json({
      message: "Permissão adicionada com sucesso!",
      data: permission.toJSON(),
    });
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
      .json({ message: "Permissão atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function removePermission(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const removed = await Permission.destroy({ where: { id } });

    if (!removed) {
      throw res.status(404).json({ error: "Permissão não encontrada" });
    }

    return res.status(200).json({ message: "Permissão excluída com sucesso" });
  } catch (error) {
    throw res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function listPermissions(req: Request, res: Response) {
  try {
    const permissions = await getAllPermissions();
    return res.status(200).json(permissions);
  } catch (error) {
    throw res.status(500).json({ error: "Erro interno no servidor" });
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
