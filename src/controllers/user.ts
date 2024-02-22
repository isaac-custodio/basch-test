import bcrypt from "bcrypt";
import User, { UserAttributes } from "../models/User";

import type { Request, Response } from "express";
import { getUserById } from "../utils/user";

export async function createUser(req: Request, res: Response) {
  try {
    const { password, username, email, name }: UserAttributes = req.body;

    const hashedPassword = await bcrypt.hash(password, 7);

    const user: UserAttributes = await User.create({
      password: hashedPassword,
      username,
      email,
      name,
    });

    res.status(200).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao criar usuário",
    });
  }
}

export async function removeUser(req: Request, res: Response) {
  try {
    const removedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Usuário removido com sucesso",
      removedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao remover usuário",
    });
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    res.status(200).json(await getUserById(id));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao buscar usuário pelo id",
    });
  }
}

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.findAll();
    res
      .status(200)
      .json({ message: "Lista de usuários atualizada com sucesso", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao atualizar lista de usuários",
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { password, username, email, name }: UserAttributes = req.body;

    const hashedPassword = await bcrypt.hash(password, 7);

    const updated = await User.update(
      { password: hashedPassword, email, name, username },
      { where: { id: req.params.id } }
    );

    if (!updated) {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error ao atualizar lista de usuários",
    });
  }
}
