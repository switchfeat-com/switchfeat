import { FlagModel, dbManager } from "@switchfeat/core";
import { getDataStoreManager } from "../managers/auth/dataStoreManager";

const dataStoreManager: dbManager.DataStoreManager = getDataStoreManager();

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
    return await dataStoreManager.getFlags(userId);
}

export const getFlag = async (search: { name?: string, id?: string, key?: string }): Promise<FlagModel | null> => {

    if (search.name) {
        return await dataStoreManager.getFlagByName(search.name);
    }

    if (search.id) {
        return await dataStoreManager.getFlagById(search.id);
    }

    if (search.key) {
        return await dataStoreManager.getFlagByKey(search.key);
    }

    return null;
}

export const addFlag = async (flag: FlagModel): Promise<boolean> => {
    return await dataStoreManager.addFlag(flag);
}

export const updateFlag = async (flag: FlagModel): Promise<boolean> => {
    return await dataStoreManager.updateFlag(flag);
}