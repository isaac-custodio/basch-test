import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session, { SessionData } from "express-session";
import swaggerUi from "swagger-ui-express";

import { config } from "dotenv";
import { isAuth } from "./middleware/isAuth";

import { AuthRouter } from "../routes/auth";
import { PermissionRouter } from "../routes/permissions";
import { ScreenRouter } from "../routes/screens";
import { UserRouter } from "../routes/users";

import { swaggerDocs } from "./config/swagger";
import { UserPermissionRouter } from "../routes/userPermission";

import isAdmin from "./middleware/isAdmin";
import { ScreenPermissionRouter } from "../routes/screenPermission";

export interface CustomSessionData extends SessionData {
  userId?: number;
}

config();

const { JWT_SECRET, PORT } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not provided in .env");
}

if (!PORT) {
  throw new Error("PORT not provided in .env");
}

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
  })
);

app.use(express.json());
app.use(cors());

//Routes

// Defina a descrição do grupo de rotas
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas relacionadas à autenticação
 */
app.use("/", AuthRouter);

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Rotas relacionadas à gerência de permissões
 */
app.use("/permissions", isAuth, PermissionRouter);

/**
 * @swagger
 * tags:
 *   name: Screens
 *   description: Rotas relacionadas à gerência de telas
 */
app.use("/screens", isAuth, ScreenRouter);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas relacionadas à gerência de usuários
 */
app.use("/users", isAuth, UserRouter);

/**
 * @swagger
 * tags:
 *   name: User Permissions
 *   description: Rotas relacionadas à gerência de permissões de usuários
 */
app.use("/userPermissions", isAuth, UserPermissionRouter);

/**
 * @swagger
 * tags:
 *   name: Screen Permissions
 *   description: Rotas relacionadas à gerência de permissões de tela
 */
app.use("/screenPermissions", isAuth, isAdmin, ScreenPermissionRouter);

export default app;
