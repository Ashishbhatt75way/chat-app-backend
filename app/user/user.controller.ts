import { NextFunction, type Request, type Response } from 'express';
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import * as userService from "./user.service";

/**
 * @route POST /users
 * @desc Create a new user
 * @access Public
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    res.send(createResponse(result, "User created successfully"))
});

/**
 * @route PUT /users/:id
 * @desc Update an existing user
 * @access Public
 * @param {string} req.params.id - ID of the user to update
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated successfully"))
});

/**
 * @route PATCH /users/:id
 * @desc Edit an existing user
 * @access Public
 * @param {string} req.params.id - ID of the user to edit
 */
export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated successfully"))
});

/**
 * @route DELETE /users/:id
 * @desc Delete a user by ID
 * @access Public
 * @param {string} req.params.id - ID of the user to delete
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.params.id);
    res.send(createResponse(result, "User deleted successfully"))
});

/**
 * @route GET /users/:id
 * @desc Get a user by ID
 * @access Public
 * @param {string} req.params.id - ID of the user to retrieve
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result))
});

/**
 * @route GET /users
 * @desc Get all users
 * @access Public
 */
export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});

/**
 * @route POST /users/:id/members
 * @desc Add members to a user group
 * @access Public
 * @param {string} req.params.id - ID of the user
 * @param {Object} req.body - Member details to add
 */
export const addMembers = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.addMembers(req.params.id, req.body);
    res.send(createResponse(result, "Members added successfully"));
});
