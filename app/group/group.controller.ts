import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as groupServices from './group.service';
import { createResponse } from '../common/helper/response.hepler';

/**
 * @route GET /groups
 * @desc Get all groups
 * @access Public
 */
export const getAllGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.getAllGroup();
  res.send(createResponse(result));
});

/**
 * @route GET /groups/:id
 * @desc Get a group by ID
 * @access Public
 */
export const getGroupById = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.params.id);
  const result = await groupServices.getGroupById(req.params.id);
  res.send(createResponse(result));
});

/**
 * @route POST /groups
 * @desc Create a new group
 * @access Public
 * @param {string} req.body.adminId - ID of the admin creating the group
 */
export const createGroup = asyncHandler(async (req: Request, res: Response) => {
  const { adminId } = req.body;
  const result = await groupServices.createGroup(req.body, adminId);
  res.send(createResponse(result, 'group created successfully'));
});

/**
 * @route PUT /groups/:id
 * @desc Update an existing group
 * @access Public
 * @param {string} req.params.id - ID of the group to update
 */
export const updateGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.updateGroup(req.params.id, req.body);
  res.send(createResponse(result, 'group updated successfully'));
});

/**
 * @route DELETE /groups/:id
 * @desc Delete a group by ID
 * @access Public
 * @param {string} req.params.id - ID of the group to delete
 */
export const deleteGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.deleteGroup(req.params.id);
  res.send(createResponse(result, 'group deleted successfully'));
});

/**
 * @route POST /groups/:id/members
 * @desc Add members to a group
 * @access Public
 * @param {string} req.params.id - ID of the group
 * @param {string} req.body.memberId - ID of the member to add
 * @param {string} req.body.adminId - ID of the admin adding the member
 */
export const addMembers = asyncHandler(async (req: Request, res: Response) => {
  const { memberId, adminId } = req.body;
  const result = await groupServices.addMembers(req.params.id, adminId, memberId);
  res.send(createResponse(result, 'Members added successfully'));
});

/**
 * @route POST /groups/:id/make-admin
 * @desc Promote a member to admin
 * @access Public
 * @param {string} req.params.id - ID of the group
 * @param {string} req.body.adminId - ID of the current admin
 * @param {string} req.body.memberId - ID of the member to promote
 */
export const makeAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { adminId, memberId } = req.body;
  const result = await groupServices.makeAdmin(req.params.id, adminId, memberId);
  res.send(createResponse(result, 'Admin added successfully'));
});

/**
 * @route POST /groups/:id/remove-admin
 * @desc Remove an admin from the group
 * @access Public
 * @param {string} req.params.id - ID of the group
 * @param {string} req.body.adminId - ID of the admin to remove
 */
export const removeAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { adminId } = req.body;
  const result = await groupServices.removeAdmin(req.params.id, adminId);
  res.send(createResponse(result, 'Admin removed successfully'));
});
