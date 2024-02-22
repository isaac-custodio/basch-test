import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

import { Request, Response } from "express";
import { getUserById } from "../utils/user";
import { Session } from "express-session";
import { getUserPermissions } from "../utils/userPermission";

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user.id }, "secretpassword");
    res
      .status(200)
      .json({ token, message: "Você fez login na Basch Test API" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function getMyUser(req: Request, res: Response) {
  try {
    const { id } = req.session as Session;
    const user = await getUserById(id);
    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}

export async function getCurrentUserPermissions(req: Request, res: Response) {
  try {
    const { id } = req.session;

    const permissions = getUserPermissions(id);

    if (!permissions) {
      res.status(404).json({ error: "Usuário sem permissões" });
    }

    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
