import { ConditionModel, dbManager } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (manager: Promise<dbManager.DataStoreManager>) => {
    manager.then(data => dataStoreManager = data);
};


export const getConditions = async (segmentId: string): Promise<ConditionModel[]> => {
    return await dataStoreManager.getConditions(segmentId);
};

export const getCondition = async (search: { id?: string, key?: string }): Promise<ConditionModel | null> => { 

    if (search.id) {
        return await dataStoreManager.getConditionById(search.id);
    }

    if (search.key) {
        return await dataStoreManager.getConditionByKey(search.key);
    }

    return null;
};

export const addCondition = async (condition: ConditionModel): Promise<boolean> => {
    return await dataStoreManager.addCondition(condition);
};

export const updateCondition = async (condition: ConditionModel): Promise<boolean> => {
    return await dataStoreManager.updateCondition(condition);
};

export const deleteCondition = async (condition: ConditionModel): Promise<boolean> => {
    return await dataStoreManager.deleteCondition(condition);
};