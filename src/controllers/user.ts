import bcrypt from "bcrypt";
import User, { UserAttributes } from "../models/User";

import type { Request, Response } from "express";
import { getUserById } from "../utils/user";
import { CustomSessionData } from "../app";

export async function createUser(req: Request, res: Response) {
  try {
    const { password, username, email, name }: UserAttributes = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);

    const created = await User.create({
      password: hashedPassword,
      username,
      email,
      name,
    });

    return res
      .status(200)
      .json({ message: "Usuário criado com sucesso!", data: created.toJSON() });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao criar usuário",
    });
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const removedUser = await User.destroy({
      where: {
        id,
      },
    });

    if (removedUser < 1) {
      return res.status(404).json({ error: "Usuário não existe" });
    } else {
      return res.status(200).json({
        message: "Usuário removido com sucesso",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao remover usuário",
    });
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar usuário pelo id",
    });
  }
}

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    return res
      .status(200)
      .json({ message: "Lista de usuários atualizada com sucesso", users });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao atualizar lista de usuários",
    });
  }
}

export async function updateUser(
  req: Request & { session: CustomSessionData },
  res: Response
) {
  try {
    const { userId } = req.session;

    const { password, username, email, name }: UserAttributes = req.body;

    let hashedPassword: string | null = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 7);
    }

    if (!userId) {
      throw res.status(401).json({ error: "Você não está logado na API" });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const updated = await User.update(
      { password: hashedPassword ?? user.password, email, name, username },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: "Erro ao atualizar usuário" });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({
      error: "Error ao atualizar usuário",
    });
  }
}
