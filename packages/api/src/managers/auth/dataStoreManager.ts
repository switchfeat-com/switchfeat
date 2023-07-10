import { dbManager } from "@switchfeat/core";

// return the datastore based on the active configuration.
export const getDataStoreManager = (): dbManager.DataStoreManager => {
    return dbManager.getDataStore(dbManager.SupportedDb.NeDB);
};