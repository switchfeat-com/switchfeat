import { FlagModel } from "../../../models/flagModel";
import { NeDbManager } from "../dbManager";

let neDbManager: NeDbManager;

export const setNeDbManager = (neDbGlobalManager: NeDbManager) => {
    neDbManager = neDbGlobalManager;
};

export const getFlags = async (): Promise<FlagModel[]> => neDbManager.flags!.asyncFind({});

export const getFlagByName = async (name: string): Promise<FlagModel> => neDbManager.flags!.asyncFindOne({
    name,
});

export const getFlagById = async (id: string): Promise<FlagModel> => neDbManager.flags!.asyncFindOne({
    _id: id,
});

export const getFlagByKey = async (key: string): Promise<FlagModel> => neDbManager.flags!.asyncFindOne({
    key,
});

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
        const response = await neDbManager.flags!.asyncUpdate({ _id: flag._id }, {
            $set: { 
                status: flag.status, 
                description: flag.description, 
                name: flag.name, 
                updatedOn: flag.updatedOn,
                rules: flag.rules } as FlagModel
        });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteFlag = async (flag: FlagModel): Promise<boolean> => {
    try {
        const response = await neDbManager.flags!.asyncRemove({ _id: flag._id });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};