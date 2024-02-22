import { Router } from "express";

import {
  addScreenPermission,
  listScreenPermissions,
  removeScreenPermission,
} from "../controllers/screenPermission";

import isAdmin from "../app/middleware/isAdmin";

export const ScreenPermissionRouter = Router();

/**
 * @openapi
 * /screenPermissions/{screenPermissionId}:
 *   get:
 *     summary: Listar permissões da tela
 *     description: Retorna a lista de permissões associadas a uma tela específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: screenPermissionId
 *         required: true
 *         description: ID da tela para a qual as permissões serão listadas
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Permissões da tela listadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermissionAttributes'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem listar permissões de tela
 *       '404':
 *         description: Tela não encontrada
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

ScreenPermissionRouter.get(
  "/:screenPermissionId",
  isAdmin,
  listScreenPermissions
);

/**
 * @swagger
 * /screenPermissions/{screenPermissionId}/{permissionId}:
 *   post:
 *     summary: Adicionar permissão à tela
 *     description: Associa uma permissão específica a uma tela específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: screenPermissionId
 *         required: true
 *         description: ID da tela à qual a permissão será adicionada
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: path
 *         name: permissionId
 *         required: true
 *         description: ID da permissão a ser associada à tela
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '201':
 *         description: Permissão adicionada à tela com sucesso
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem adicionar permissões a telas
 *       '404':
 *         description: Tela ou permissão não encontrada
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

ScreenPermissionRouter.post(
  "/:screenPermissionId/:permissionId",
  isAdmin,
  addScreenPermission
);

/**
 * @swagger
 * /screenPermissions/{screenPermissionId}/{permissionId}:
 *   delete:
 *     summary: Remover permissão da tela
 *     description: Remove a associação entre uma permissão específica e uma tela específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: screenPermissionId
 *         required: true
 *         description: ID da tela da qual a permissão será removida
 *         schema:
 *           type: integer
 *           format: int64
 *       - in: path
 *         name: permissionId
 *         required: true
 *         description: ID da permissão a ser removida da tela
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '204':
 *         description: Permissão removida da tela com sucesso
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         description: Apenas administradores podem remover permissões de telas
 *       '404':
 *         description: Tela ou permissão não encontrada
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */

ScreenPermissionRouter.delete(
  "/:screenPermissionId/:permissionId",
  isAdmin,
  removeScreenPermission
);
