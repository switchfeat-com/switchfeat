import { SdkAuthModel, dbManager } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (manager: Promise<dbManager.DataStoreManager>) => {
    manager.then(data => dataStoreManager = data);
};

export const getSdkAuths = async (userKey: string): Promise<SdkAuthModel[]> => {
    return await dataStoreManager.getSdkAuths(userKey);
};

export const getSdkAuth = async (search: { key?: string }): Promise<SdkAuthModel | null> => {

    if (search.key) {
        return await dataStoreManager.getSdkAuthByKey(search.key);
    }

    return null;
};

 
export const addSdkAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    return await dataStoreManager.addSdkAuth(auth);
};

export const deleteSdkAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    return await dataStoreManager.deleteSdkAuth(auth);
};