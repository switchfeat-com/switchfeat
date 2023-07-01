import { ObjectId } from 'mongodb';

export interface ConditionModel {
    id?: ObjectId,
    name: string;
    description?: string;
    createdOn: Date;
    updatedOn: Date;
    status: boolean;
}