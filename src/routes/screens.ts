import hasScreenPermission from "../app/middleware/hasScreenPermission";

import { Router } from "express";

import {
  addScreen,
  findScreenById,
  listScreens,
  removeScreen,
  updateScreen,
} from "../controllers/screen";

import isAdmin from "../app/middleware/isAdmin";

export const ScreenRouter = Router();

/**
 * @openapi
 * /screens:
 *   post:
 *     summary: Adicionar uma nova tela
 *     description: Adiciona uma nova tela ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screen'
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     responses:
 *       '201':
 *         description: Tela adicionada com sucesso
 *       '400':
 *         description: Solicitação inválida
 *       '401':
 *         description: Não autorizado - permissões de administrador necessárias
 */

ScreenRouter.post("/", isAdmin, addScreen);

/**
 * @openapi
 * /screens:
 *   get:
 *     summary: Listar todas as telas
 *     description: Retorna uma lista de todas as telas disponíveis no sistema
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de telas recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screen'
 */

ScreenRouter.get("/", listScreens);

/**
 * @openapi
 * /screens/{id}:
 *   get:
 *     summary: Obter tela por ID
 *     description: Retorna os detalhes de uma tela específica com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da tela a ser recuperada
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Detalhes da tela recuperados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screen'
 *       '404':
 *         description: Tela não encontrada
 */

ScreenRouter.get("/:id", hasScreenPermission, findScreenById);

/**
 * @openapi
 * /screens/{id}:
 *   put:
 *     summary: Atualizar tela por ID
 *     description: Atualiza os detalhes de uma tela específica com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da tela a ser atualizada
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screen'
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     responses:
 *       '200':
 *         description: Tela atualizada com sucesso
 *       '400':
 *         description: Solicitação inválida
 *       '401':
 *         description: Não autorizado - permissões de administrador necessárias
 *       '404':
 *         description: Tela não encontrada
 */

ScreenRouter.put("/:id", isAdmin, updateScreen);

/**
 * @openapi
 * /screens/{id}:
 *   delete:
 *     summary: Excluir tela por ID
 *     description: Exclui uma tela específica com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da tela a ser excluída
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *       - BearerAuth: []
 *       - AdminAuth: []
 *     responses:
 *       '204':
 *         description: Tela excluída com sucesso
 *       '401':
 *         description: Não autorizado - permissões de administrador necessárias
 *       '404':
 *         description: Tela não encontrada
 */

ScreenRouter.delete("/:id", isAdmin, removeScreen);
