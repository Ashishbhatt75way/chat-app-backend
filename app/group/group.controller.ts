import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as groupServices from './group.service';
import { createResponse } from '../common/helper/response.hepler';

export const getAllGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.getAllGroup();
  res.send(createResponse(result));
});

export const getGroupById = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.params.id);
    const result = await groupServices.getGroupById(req.params.id);
    res.send(createResponse(result));
  }
);

export const createGroup = asyncHandler(async (req: Request, res: Response) => {

    const {adminId} = req.body;
  const result = await groupServices.createGroup(req.body , adminId);
  res.send(createResponse(result, 'group created successfully'));
});

export const updateGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.updateGroup(req.params.id, req.body);
  res.send(createResponse(result, 'group updated successfully'));
});

export const deleteGroup = asyncHandler(async (req: Request, res: Response) => {
  const result = await groupServices.deleteGroup(req.params.id);
  res.send(createResponse(result, 'group deleted successfully'));
});

export const addMembers = asyncHandler(async (req: Request, res: Response) => {
  const { memberId , adminId } = req.body;
  console.log(req.body);

  const result = await groupServices.addMembers(req.params.id,adminId, memberId);
  res.send(createResponse(result, 'Members added successfully'));
});
