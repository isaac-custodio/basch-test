import { Router } from "express";

import {
  createUser,
  findUserById,
  listUsers,
  removeUser,
  updateUser,
} from "../controllers/user";

export const UserRouter = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar usuário
 *     description: Cria um novo usuário com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAttributes'
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAttributes'
 *       '400':
 *         description: Solicitação inválida. Verifique se os dados do usuário estão corretos.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem criar usuários
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
UserRouter.post("/", createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obter usuário por ID
 *     description: Retorna os detalhes de um usuário com base no ID fornecido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser recuperado
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Dados do usuário recuperados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAttributes'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem acessar os detalhes do usuário
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
UserRouter.get("/:id", findUserById);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     description: Retorna uma lista de todos os usuários cadastrados no sistema.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de usuários recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserAttributes'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem acessar a lista de usuários
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
UserRouter.get("/", listUsers);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remover usuário
 *     description: Remove um usuário existente com base no ID fornecido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser removido
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: Usuário removido com sucesso
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem remover usuários
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
UserRouter.delete("/:id", removeUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     description: Atualiza os dados de um usuário existente com base no ID fornecido.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: requestBody
 *         description: Dados do usuário a serem atualizados
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAttributes'
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAttributes'
 *       '400':
 *         description: Solicitação inválida. Verifique se os dados do usuário estão corretos.
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem atualizar usuários
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

UserRouter.put("/:id", updateUser);
