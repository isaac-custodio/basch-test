import { Router } from "express";

import {
  addPermission,
  findPermissionById,
  listPermissions,
  removePermission,
  updatePermission,
} from "../controllers/permission";
import isAdmin from "../app/middleware/isAdmin";

export const PermissionRouter = Router();

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Adicionar permissão
 *     description: Adiciona uma nova permissão ao sistema.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionAttributes'
 *     responses:
 *       '201':
 *         description: Permissão adicionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionAttributes'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem adicionar permissões
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
PermissionRouter.post("/", isAdmin, addPermission);

/**
 * @openapi
 * /permissions:
 *   get:
 *     summary: Listar todas as permissões
 *     description: Retorna uma lista de todas as permissões disponíveis no sistema
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de permissões recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */

PermissionRouter.get("/", listPermissions);

/**
 * @openapi
 * /permissions/{id}:
 *   get:
 *     summary: Obter permissão por ID
 *     description: Retorna os detalhes de uma permissão específica com base no ID fornecido
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID da permissão a ser recuperada
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Detalhes da permissão recuperados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       '404':
 *         description: Permissão não encontrada
 */

PermissionRouter.get("/:id", findPermissionById);

/**
 * @openapi
 * /permissions/{id}:
 *   delete:
 *     summary: Remover permissão
 *     description: Remove uma permissão específica do sistema.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da permissão a ser removida
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: Permissão removida com sucesso
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem remover permissões
 *       '404':
 *         description: Permissão não encontrada
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

PermissionRouter.delete("/:id", isAdmin, removePermission);

/**
 * @openapi
 * /permissions/{id}:
 *   put:
 *     summary: Atualizar permissão
 *     description: Atualiza uma permissão específica do sistema.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da permissão a ser atualizada
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionAttributes'
 *     responses:
 *       '200':
 *         description: Permissão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionAttributes'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem atualizar permissões
 *       '404':
 *         description: Permissão não encontrada
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

PermissionRouter.put("/:id", isAdmin, updatePermission);
