import { dbManager } from "@switchfeat/core";

// return the datastore based on the active configuration.
export const getDataStoreManager = async (): Promise<dbManager.DataStoreManager> => {
    return await dbManager.getDataStore(dbManager.SupportedDb.NeDB);
};