import { FlagModel, dbManager } from "@switchfeat/core";
import { RuleModel } from "@switchfeat/core/dist/models/ruleModel";

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

export const getRulesByFlag = async (flagKey: string): Promise<RuleModel[]> => {
    if (!flagKey) {
        return [];
    }
    try {
        const flag = await dataStoreManager.getFlagByKey(flagKey);
        if (flag && flag.rules) {
            return flag.rules;
        }
        return [];
    } catch (error) {
        throw error;
    }
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