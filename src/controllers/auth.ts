import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
    const token = jwt.sign({ id: user.id }, "secretpassword");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
