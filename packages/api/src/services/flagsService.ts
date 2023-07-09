import { FlagModel, mongoManager, neDbManager } from "@switchfeat/core";

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
    return await neDbManager.getFlags(userId);
}

export const getFlag = async (search: { name?: string, id?: string, key?: string }): Promise<FlagModel | null> => {

    if (search.name) {
        return await neDbManager.getFlagByName(search.name);
    }

    if (search.id) {
        return await neDbManager.getFlagById(search.id);
    }

    if (search.key) {
        return await neDbManager.getFlagByKey(search.key);
    }

    return null;
}

export const addFlag = async (flag: FlagModel): Promise<boolean> => {
    return await neDbManager.addFlag(flag);
}

export const updateFlag = async (flag: FlagModel): Promise<boolean> => {
    return await neDbManager.updateFlag(flag);
}