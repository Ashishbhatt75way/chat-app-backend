import { type BaseSchema } from "../common/dto/base.dto";

export interface IGroup extends BaseSchema {
    name: string;
    admin : string;
    active: boolean;
    privacy: "PUBLIC" | "PRIVATE";
}