import AsyncNedb from 'nedb-async';

import { FlagModel } from "../../models/flagModel";
import { ConditionModel } from "../../models/conditionModel";
import { UserModel } from "../../models/userModel";
import { DataStoreManager, NeDbManager, SupportedDb, getDbProvider } from "./dbManager";

let neDbManager: NeDbManager;
let dataStoreInstance: DataStoreManager;

export const createNeDbDataStore = (): DataStoreManager => {
    if (!dataStoreInstance) {
        dataStoreInstance = {
            connectDb: connectDb,
            addFlag: addFlag,
            deleteFlag: deleteFlag,
            getFlagById: getFlagById,
            getFlagByKey: getFlagByKey,
            getFlagByName: getFlagByName,
            getFlags: getFlags,
            updateFlag: updateFlag,
            getUser: () => { throw new Error(); },
            getUserByEmail: () => { throw new Error(); },
            addUser: () => { throw new Error(); },
            updateUser: () => { throw new Error(); },
            deleteUser: () => { throw new Error(); }
        };
    }
    return dataStoreInstance;
}


export const connectDb = async () => {
    try {
        neDbManager = getDbProvider(SupportedDb.NeDB) as NeDbManager;
        neDbManager.flags = new AsyncNedb<FlagModel>({ filename: 'db.switchfeat.flags', autoload: true });
        neDbManager.conditions = new AsyncNedb<ConditionModel>({ filename: 'db.switchfeat.conditions', autoload: true });
        neDbManager.users = new AsyncNedb<UserModel>({ filename: 'db.switchfeat.users', autoload: true });

        console.log(`NeDBManager: connectDB: connected to local neDB`);
    } catch (ex) {
        console.error(ex);
        throw new Error(`NeDBManager: connectDB: Unable to connect to DB: ${ex}`);
    }
}

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
    return await neDbManager.flags!.asyncFind({});
};

export const getFlagByName = async (name: string): Promise<FlagModel> => {
    return await neDbManager.flags!.asyncFindOne({
        "name": name
    });
};

export const getFlagById = async (id: string): Promise<FlagModel> => {
    return await neDbManager.flags!.asyncFindOne({
        _id: id
    });
};

export const getFlagByKey = async (key: string): Promise<FlagModel> => {
    return await neDbManager.flags!.asyncFindOne({
        key: key
    });
};

export const addFlag = async (flag: FlagModel): Promise<boolean> => {
    try {
        const response = await neDbManager.flags!.asyncInsert(flag);
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const updateFlag = async (flag: FlagModel): Promise<boolean> => {
    try {
        const response = await neDbManager.flags!.asyncUpdate({ _id: flag._id }, { $set: { status: flag.status, description: flag.description } });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteFlag = async (flag: FlagModel): Promise<boolean> => {
    try {
        const response = await neDbManager.flags!.asyncRemove({ _id: flag._id });
        return true;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const getUser = async (userId: string): Promise<UserModel> => {
    return await neDbManager.users!.asyncFindOne({
        _id: userId
    });
};

export const getUserByEmail = async (email: string): Promise<UserModel> => {
    return await neDbManager.users!.asyncFindOne({
        email: email
    });
};

export const addUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await neDbManager.users!.asyncInsert(user);
        return (!!response);
    } catch (ex) {
        return false;
    }
};

export const updateUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await neDbManager.users!.asyncUpdate({ _id: user._id }, { $set: user });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await neDbManager.users!.asyncRemove({ _id: user._id });
        return true;
    } catch (ex) {
        return false;
    }
};
