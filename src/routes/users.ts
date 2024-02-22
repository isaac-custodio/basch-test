import { Router } from "express";

import {
  createUser,
  findUserById,
  listUsers,
  removeUser,
  updateUser,
} from "../controllers/user";

export const UserRouter = Router();

UserRouter.post("/", createUser);
UserRouter.get("/:id", findUserById);
UserRouter.get("/", listUsers);
UserRouter.delete("/:id", removeUser);
UserRouter.put("/:id", updateUser);
