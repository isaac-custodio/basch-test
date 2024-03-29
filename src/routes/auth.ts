import { Router } from "express";

import { login, getMyUser, getMyUserPermissions } from "../controllers/auth";
import { isAuth } from "../app/middleware/isAuth";

export const AuthRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas relacionadas à autenticação
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login na API
 *     description: Autentica o usuário e gera o token de acesso
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de acesso gerado após o login
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *               message: "Você fez login na Basch Test API"
 *
 */
AuthRouter.post("/login", login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obter informações do usuário atual
 *     description: Recupera detalhes do usuário autenticado no momento
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Detalhes do usuário recuperados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID do usuário
 *                 username:
 *                   type: string
 *                   description: Nome de usuário
 *                 email:
 *                   type: string
 *                   description: Endereço de e-mail do usuário
 *                 name:
 *                   type: string
 *                   description: Nome completo do usuário
 *             example:
 *               id: 1
 *               username: usuarioExemplo
 *               email: exemplo@email.com
 *               name: Usuário Exemplo
 */
AuthRouter.get("/me", isAuth, getMyUser);

/**
 * @openapi
 * /auth/me/permissions:
 *   get:
 *     summary: Obter permissões do usuário logado
 *     description: Recupera as permissões associadas ao usuário logado.
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Operação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermissionAttributes'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

AuthRouter.get("/me/permissions", isAuth, getMyUserPermissions);
