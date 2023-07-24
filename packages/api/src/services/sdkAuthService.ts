import { SdkAuthModel, dbManager } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (manager: Promise<dbManager.DataStoreManager>) => {
    manager.then(data => dataStoreManager = data);
};

export const getsdkAuths = async (userKey: string): Promise<SdkAuthModel[]> => {
    return await dataStoreManager.getsdkAuths(userKey);
};

export const getApiAuth = async (search: { key?: string }): Promise<SdkAuthModel | null> => {

    if (search.key) {
        return await dataStoreManager.getApiAuthByKey(search.key);
    }

    return null;
};

 
export const addApiAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    return await dataStoreManager.addApiAuth(auth);
};

export const deleteApiAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    return await dataStoreManager.deleteApiAuth(auth);
};