import mongoose from 'mongoose';

export interface BaseSchema {
  _id: mongoose.Types.ObjectId | string;
  createdAt: string;
  updatedAt: string;
}
