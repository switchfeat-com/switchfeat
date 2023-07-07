import { ConditionModel } from './conditionModel';
import { ObjectId } from 'mongodb';

export interface FlagModel {
    id?: ObjectId,
    name: string;
    key: string;
    description?: string;
    createdOn: Date;
    updatedOn: Date;
    status: boolean;
    condition?: ConditionModel;
}