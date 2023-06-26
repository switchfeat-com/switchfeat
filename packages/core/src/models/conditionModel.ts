import { DateTime } from 'luxon';
import { ObjectId } from 'mongodb';

export interface ConditionModel {
    id?: ObjectId,
    name: string;
    description?: string;
    createdOn: DateTime;
    updatedOn: DateTime;
    status: boolean;
}