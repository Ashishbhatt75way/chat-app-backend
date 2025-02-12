import { Router } from 'express'
import * as groupController from './group.controller'
import * as groupValidator from './group.validation'
import { catchError } from '../common/middleware/cath-error.middleware'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: API endpoints for managing groups
 */

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: List of all groups
 *       500:
 *         description: Internal server error
 */
router.get('/', groupController.getAllGroup);

/**
 * @swagger
 * /groups/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     responses:
 *       200:
 *         description: Group details
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', groupController.getGroupById);

/**
 * @swagger
 * /groups/{id}:
 *   delete:
 *     summary: Delete a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', groupController.deleteGroup);

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the group
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', groupValidator.createGroup, catchError, groupController.createGroup);

/**
 * @swagger
 * /groups/{id}:
 *   put:
 *     summary: Update an existing group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated group name
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', groupValidator.updateGroup, catchError, groupController.updateGroup);

/**
 * @swagger
 * /groups/{id}/add:
 *   post:
 *     summary: Add members to a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - members
 *             properties:
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of member IDs to add
 *     responses:
 *       200:
 *         description: Members added successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Group not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/add', catchError, groupController.addMembers);



export default router
