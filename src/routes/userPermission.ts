import { Router } from "express";

import {
  listUserPermissions,
  addUserPermission,
  removeUserPermission,
} from "../controllers/userPermission";

import isAdmin from "../app/middleware/isAdmin";

export const UserPermissionRouter = Router();

/**
 * @swagger
 * tags:
 *   name: /userPermissions
 *   description: Rotas relacionadas à gerência de permissões de usuários
 */

/**
 * @openapi
 * /userPermissions/{userId}:
 *   get:
 *     summary: Listar permissões do usuário
 *     description: Retorna a lista de permissões associadas a um usuário específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário para o qual as permissões serão listadas
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Permissões do usuário listadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermissionAttributes'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem listar permissões de usuários
 *       '404':
 *         description: Usuário não encontrado
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

UserPermissionRouter.get("/:userId", isAdmin, listUserPermissions);

/**
 * @swagger
 * /userPermission/{userId}/{permissionId}:
 *   post:
 *     summary: Adicionar permissão a usuário
 *     description: Associa uma permissão específica a um usuário específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário ao qual a permissão será associada
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: path
 *         name: permissionId
 *         required: true
 *         description: ID da permissão a ser associada ao usuário
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '201':
 *         description: Permissão adicionada ao usuário com sucesso
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem adicionar permissões a usuários
 *       '404':
 *         description: Usuário ou permissão não encontrada
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

UserPermissionRouter.post("/:userId/:permissionId", isAdmin, addUserPermission);

/**
 * @swagger
 * /userPermissions/{userId}/{permissionId}:
 *   delete:
 *     summary: Remover permissão de usuário
 *     description: Remove a associação entre uma permissão específica e um usuário específico.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID do usuário do qual a permissão será removida
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: path
 *         name: permissionId
 *         required: true
 *         description: ID da permissão a ser removida do usuário
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: Permissão removida do usuário com sucesso
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem remover permissões de usuários
 *       '404':
 *         description: Usuário ou permissão não encontrada
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

UserPermissionRouter.delete(
  "/:userId/:permissionId",
  isAdmin,
  removeUserPermission
);
