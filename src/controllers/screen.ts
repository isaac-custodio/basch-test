import Screen, { ScreenAttributes } from "../models/Screen";

import { NextFunction, Request, Response } from "express";
import { getScreenById } from "../utils/screen";

export async function addScreen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, description, url }: ScreenAttributes = req.body;

    if (!name || !url) {
      return res
        .status(400)
        .json({ error: "Verifique os campos obrigatórios  `name` e `url`" });
    }

    const screen = await Screen.create({ description, name, url });

    return res
      .status(200)
      .json({ message: "Tela adicionada com sucesso!", data: screen });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function listScreens(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const screens = await Screen.findAll();

    res.status(200).json({
      message: "Lista de telas atualizada com sucesso",
      data: screens,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function findScreenById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const screen = await getScreenById(Number(req.params.id));

    if (!screen) {
      res.status(404).json({ error: "Tela não encontrada" });
    }

    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function updateScreen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, url, description }: ScreenAttributes = req.body;

    const updated = await Screen.update(
      { description, name, url },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Tela não encontrada",
      });
    }

    return res.status(200).json({ message: "Tela atualizada com sucesso" });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export async function removeScreen(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const removed = await Screen.destroy({ where: { id } });

    if (!removed) {
      return res.status(404).json({ error: "Tela não encontrada" });
    }

    return res.status(200).json({ message: "Tela removida com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
