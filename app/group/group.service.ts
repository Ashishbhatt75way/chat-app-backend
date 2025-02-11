import { IGroup } from './group.dto'
import groupSchema from './group.schema'

export const createGroup = async (data: IGroup) => {
  const result = await groupSchema.create(data)
  return result
}

export const getAllGroup = async () => {
  const result = await groupSchema.find({}).lean()
  return result
}

export const getGroupById = async (id: string) => {
  console.log(id);
  const result = await groupSchema.findById(id).lean()
  return result
}

export const deleteGroup = async (id: string) => {
  const result = await groupSchema.deleteOne({ _id: id })
  return result
}

export const checkGroupAdmin = async (id: string, groupId: string) => {
  const result = await groupSchema.findOne({ _id: groupId, admin: id })
  return result;
}

export const updateGroup = async (id: string, data: IGroup) => {
  await groupSchema.findOneAndUpdate({ _id: id }, data);
  const result = await getGroupById(id);
  return result;
}
