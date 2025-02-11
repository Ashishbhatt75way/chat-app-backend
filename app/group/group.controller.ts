import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as groupServices from './group.service';



export const getAllGroup = asyncHandler(async (req: Request, res: Response) => {
    const result = await groupServices.getAllGroup()
    res.send(result)
})

export const getGroupById = asyncHandler(async (req: Request, res: Response) => {
    const result = await groupServices.getGroupById(req.params.id)
    res.send(result)
})

export const createGroup = asyncHandler(async (req: Request, res: Response) => {
    const result = await groupServices.createGroup(req.body)
    res.send(result)
})

export const updateGroup = asyncHandler(async (req: Request, res: Response) => {
    const result = await groupServices.updateGroup(req.params.id, req.body)
    res.send(result)
})