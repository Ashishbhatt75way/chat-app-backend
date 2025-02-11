
import { NextFunction, type Request, type Response } from 'express';
import asyncHandler from "express-async-handler";
import { createResponse } from "../common/helper/response.hepler";
import * as userService from "./user.service";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.createUser(req.body);
    res.send(createResponse(result, "User created successfully"))
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated successfully"))
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.editUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated successfully"))
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.deleteUser(req.params.id);
    res.send(createResponse(result, "User deleted successfully"))
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getUserById(req.params.id);
    res.send(createResponse(result))
});

export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.getAllUser();
    res.send(createResponse(result))
});

export const addMembers = asyncHandler(async (req: Request, res: Response) => {
    const result = await userService.addMembers(req.params.id, req.body);
    res.send(createResponse(result, "Members added successfully"));
});

export const login = asyncHandler(async(req:Request , res:Response , next:NextFunction) => {
    const result = await userService.login(req.body);
    res.send(createResponse(result, "User logged in successfully"));
})

