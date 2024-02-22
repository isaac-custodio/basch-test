import type { Request, Response, NextFunction } from "express";
import { getUserPermissions } from "../../utils/userPermission";
import { getUserById } from "../../utils/user";

export default async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.session;

    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ error: "Sem autorização" });
    }

    const permissions = await getUserPermissions(id);

    const hasAdminRole = permissions.find((p) => p.id < 2);

    if (!hasAdminRole) {
      res.status(401).json({ error: "Sem autorização" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
