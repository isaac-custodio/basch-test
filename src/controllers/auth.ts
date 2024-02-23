import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

import { Request, Response } from "express";
import { getUserById } from "../utils/user";
import { getUserPermissions } from "../utils/userPermission";

import { config } from "dotenv";
import { CustomSessionData } from "../app";

config();

const { JWT_SECRET } = process.env;

type UserCredentials = {
  username: string;
  password: string;
};

export async function login(req: Request, res: Response) {
  try {
    const { username, password }: UserCredentials = req.body;

    const found = await User.findOne({ where: { username } });

    if (!found) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const user = found.toJSON();

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET ?? "", {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ token, message: "Você fez login na Basch Test API" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function getMyUser(
  req: Request & { session: CustomSessionData },
  res: Response
) {
  try {
    const { userId } = req.session;

    if (!userId) {
      throw res.status(404).json({ error: "Você não está logado na API" });
    }

    const user = await getUserById(userId);
    if (!user) {
      throw res.status(404).json({ error: "Usuário não encontrado" });
    }

    const { username, createdAt, email, id, name, updatedAt } = user;

    return res
      .status(200)
      .json({ username, createdAt, email, id, name, updatedAt });
  } catch (error) {
    throw res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function getMyUserPermissions(
  req: Request & { session: CustomSessionData },
  res: Response
) {
  try {
    const { userId } = req.session;

    if (!userId) {
      throw res.status(404).json({ error: "Você não está logado na API" });
    }

    const permissions = await getUserPermissions(Number(userId));

    if (!permissions) {
      throw res.status(404).json({ error: "Usuário sem permissões" });
    }

    return res.status(200).json(permissions);
  } catch (error) {
    throw res.status(500).json({ error: "Erro interno no servidor" });
  }
}
