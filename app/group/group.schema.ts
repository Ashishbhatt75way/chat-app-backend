import { type IGroup } from './group.dto';
import mongoose from "mongoose";

const Schema = mongoose.Schema;


const groupSchema = new Schema<IGroup>({
    name: { type: String, required: true },
    admin : { type: String, required: true },
    active: { type: Boolean, required: false, default: true },
}, {timestamps: true});

export default mongoose.model<IGroup>("group", groupSchema);

