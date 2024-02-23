import { CustomSessionData } from "..";
import type { Request, Response, NextFunction } from "express";
import { getScreenPermissions } from "../../utils/screenPermission";
import { getUserPermissions } from "../../utils/userPermission";

export default async function hasScreenPermission(
  req: Request & { session: CustomSessionData },
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.session;

    if (!userId) {
      throw res.status(404).json({ error: "Você não está logado na API" });
    }

    const id = Number(req.params.id) ?? undefined;

    if (!id) {
      return res.status(404).json({
        error:
          "Middleware de verificação para permissão de telas deve ser usado somente nas endpoints que possuem o parâmetro `screenId`",
      });
    }

    const screenPermissions = await getScreenPermissions(id);

    if (!screenPermissions) {
      return res.status(404).json({
        error:
          "Não foi possível encontrar as permissões da tela, tente novamente mais tarde",
      });
    }

    const userPermissions = await getUserPermissions(userId);

    if (!userPermissions) {
      return res.status(404).json({
        error:
          "Não foi possivel encontrar as permissoes do usuário, tente novamente mais tarde",
      });
    }

    const hasPermission = screenPermissions.some((screenPermission) =>
      userPermissions.some(
        (userPermission) => userPermission.id === screenPermission.id
      )
    );

    if (!hasPermission) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para acessar essa tela" });
    }

    next();
  } catch (error) {
    throw res.status(500).json({ error: "Erro interno no servidor" });
  }
}
