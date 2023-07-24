import { BaseModel } from './baseModel';

export type UserModel = {
    email?: string;
    isBlocked: boolean;
    imageUrl: string | undefined;
} & BaseModel;