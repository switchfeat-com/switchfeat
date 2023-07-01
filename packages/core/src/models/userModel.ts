import { ObjectId } from 'mongodb';

export interface UserModel {
    id?: ObjectId,
    name: string;
    email?: string;
    createdOn: Date;
    updatedOn: Date;
    isBlocked: boolean;
    imageUrl: string;
}