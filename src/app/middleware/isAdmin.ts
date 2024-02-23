import type { Request, Response, NextFunction } from "express";
import { getUserPermissions } from "../../utils/userPermission";
import { getUserById } from "../../utils/user";
import { CustomSessionData } from "..";

export default async function isAdmin(
  req: Request & { session: CustomSessionData },
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.session;

    if (!userId) {
      throw res.status(404).json({ error: "Você não está logado na API" });
    }

    const user = await getUserById(userId);

    if (!user) {
      throw res.status(404).json({ error: "Sem autorização" });
    }

    const permissions = await getUserPermissions(userId);

    if (!permissions) {
      throw res.status(404).json({ error: "Sem permissoões" });
    }

    const hasAdminRole = permissions.find((p) => p.id && p.id < 2);

    if (!hasAdminRole) {
      throw res.status(401).json({ error: "Sem autorização" });
    }

    next();
  } catch (error) {
    throw res.status(500).json({ error: "Erro interno no servidor" });
  }
}
