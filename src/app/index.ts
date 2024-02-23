import express from "express";
import cors from "cors";
import session, { SessionData } from "express-session";
import swaggerUi from "swagger-ui-express";
import isAdmin from "./middleware/isAdmin";

import { config } from "dotenv";
import { isAuth } from "./middleware/isAuth";

import { AuthRouter } from "../routes/auth";
import { PermissionRouter } from "../routes/permissions";
import { ScreenRouter } from "../routes/screens";
import { UserRouter } from "../routes/users";

import { swaggerDocs } from "./config/swagger";
import { UserPermissionRouter } from "../routes/userPermission";

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

app.use("/", AuthRouter);
app.use("/permissions", isAuth, PermissionRouter);
app.use("/screens", isAuth, ScreenRouter);
app.use("/users", isAuth, UserRouter);
app.use("/userPermissions", isAuth, UserPermissionRouter);
app.use("/screenPermissions", isAuth, isAdmin, ScreenPermissionRouter);

export default app;
