import { ObjectId } from "mongodb";

export type BaseModel = {
    _id?: ObjectId,
    name: string;
    key: string;
    description?: string;
    createdOn: Date;
    updatedOn: Date;
};