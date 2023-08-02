import { SdkAuthModel, dbManager } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (
    manager: Promise<dbManager.DataStoreManager>,
) => {
    manager.then((data) => (dataStoreManager = data));
};

export const getSdkAuths = async (): Promise<SdkAuthModel[]> => {
    return await dataStoreManager.getSdkAuths();
};

export const getSdkAuth = async (search: {
    key?: string;
    apiKey?: string;
}): Promise<SdkAuthModel | null> => {
    if (search.key) {
        return await dataStoreManager.getSdkAuthByKey(search.key);
    }

    if (search.apiKey) {
        return await dataStoreManager.getSdkAuthByApiKey(search.apiKey);
    }

    return null;
};

export const addSdkAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    return await dataStoreManager.addSdkAuth(auth);
};

export const deleteSdkAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    return await dataStoreManager.deleteSdkAuth(auth);
};
