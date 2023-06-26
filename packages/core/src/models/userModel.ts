import { DateTime } from 'luxon';
import { ObjectId } from 'mongodb';

export interface UserModel {
    id?: ObjectId,
    name: string;
    email?: string;
    createdOn: DateTime;
    updatedOn: DateTime;
    isBlocked: boolean;
    imageUrl: string;
}