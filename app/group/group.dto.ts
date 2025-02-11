import { type BaseSchema } from "../common/dto/base.dto";

export interface IGroup extends BaseSchema {
    name: string;
    admins : string[];
    active: boolean;
    privacy: "PUBLIC" | "PRIVATE";
    members : string[];
}