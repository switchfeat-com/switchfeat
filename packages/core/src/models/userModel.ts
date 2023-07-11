import { ObjectId } from 'mongodb';

export interface UserModel {
    _id?: ObjectId,
    name: string;
    email?: string;
    createdOn: Date;
    updatedOn: Date;
    isBlocked: boolean;
    imageUrl: string | undefined;
}