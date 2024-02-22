import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { Session } from "express-session";
import { DecodedToken } from "../../types/auth";
import { config } from "dotenv";

config();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT SECRET not provided in .env");
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Não autorizado" });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as DecodedToken;
    (req.session as Session).id = decodedToken.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Seu token expirou" });
  }
};
