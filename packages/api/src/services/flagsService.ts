import { FlagModel, dbManager } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (manager: Promise<dbManager.DataStoreManager>) => {
    manager.then(data => dataStoreManager = data);
};

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
    return await dataStoreManager.getFlags(userId);
};

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
};

export const addFlag = async (flag: FlagModel): Promise<boolean> => {
    return await dataStoreManager.addFlag(flag);
};

export const updateFlag = async (flag: FlagModel): Promise<boolean> => {
    return await dataStoreManager.updateFlag(flag);
};

export const deleteFlag = async (flag: FlagModel): Promise<boolean> => {
    return await dataStoreManager.deleteFlag(flag);
};