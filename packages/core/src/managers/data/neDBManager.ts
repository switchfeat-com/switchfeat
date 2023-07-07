import AsyncNedb from 'nedb-async';


import { FlagModel } from "../../models/flagModel";
import { ConditionModel } from "../../models/conditionModel";
import { UserModel } from "../../models/userModel";
import { ObjectId } from 'mongodb';

interface dbManager {
    flags: AsyncNedb<FlagModel> | null,
    users: AsyncNedb<UserModel> | null,
    conditions: AsyncNedb<ConditionModel> | null
}

const dbManager : dbManager = {
    users: null,
    flags: null,
    conditions: null
}

export const connectDB = async () => {
    try {
        dbManager.flags = new AsyncNedb<FlagModel>({ filename: 'db.switchfeat.flags', autoload: true });
        dbManager.conditions = new AsyncNedb<ConditionModel>({ filename: 'db.switchfeat.conditions', autoload: true });
        dbManager.users = new AsyncNedb<UserModel>({ filename: 'db.switchfeat.users', autoload: true });

        console.log(`neDBManager: connectDB: connected to local neDB`);
     } catch (ex) {
        console.log(ex);
        throw new Error(`neDBManager: connectDB: Unable to connect to DB: ${ex}`);
    }
}


export const getFlags = async (userId: string): Promise<FlagModel[]> => {
    return await dbManager.flags!.asyncFind({});
};

export const getFlagByName = async (name: string): Promise<FlagModel> => {
    return await dbManager.flags!.asyncFindOne({
        "name": name
    });
};

export const getFlagById = async (id: string): Promise<FlagModel> => {
    return await dbManager.flags!.asyncFindOne({
        _id: id
    });
};

export const addFlag = async (flag: FlagModel): Promise<boolean> => {
    try {
        const response = await dbManager.flags!.asyncInsert(flag);
        return (!!response);
    } catch(ex) {
        return false;
    }
};

export const updateFlag = async (flagId: ObjectId, flag: FlagModel): Promise<boolean> => {
    try {
        const response = await dbManager.flags!.asyncUpdate({ _id: flagId }, { $set: { status: flag.status, description: flag.description} } );
        return (!!response);
    } catch(ex) {
        return false;
    }
};

export const deleteFlag = async (flag: FlagModel): Promise<boolean> => {
    try {
        const response = await dbManager.flags!.asyncRemove({ _id: new ObjectId(flag.id) });
        return  true;
    } catch(ex) {
        return false;
    }
};

export const getUser = async (userId: string): Promise<UserModel> => {
    return await dbManager.users!.asyncFindOne({
        _id: userId
    });
};

export const getUserByEmail = async (email: string): Promise<UserModel> => {
    return await dbManager.users!.asyncFindOne({
        email: email
    });
};

export const addUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await dbManager.users!.asyncInsert(user);
        return (!!response);
    } catch(ex) {
        return false;
    }
};

export const updateUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await dbManager.users!.asyncUpdate({ _id: new ObjectId(user.id) }, { $set: user } );
        return (!!response);
    } catch(ex) {
        return false;
    }
};

export const deleteUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await dbManager.users!.asyncRemove({ _id: new ObjectId(user.id) });
        return  true;
    } catch(ex) {
        return false;
    }
};
