import AsyncNedb from 'nedb-async';

import { FlagModel } from "../../models/flagModel";
import { UserModel } from "../../models/userModel";
import { DataStoreManager, NeDbManager, SupportedDb, getDbManager } from "./dbManager";
import * as flagsManager from "./NeDb/flagsNeDbManager";
import * as usersManager from "./NeDb/usersNeDbManager";
import * as segmentsManager from "./NeDb/segmentsNeDbManager";
import * as sdkAuthsManager from "./NeDb/sdkAuthNeDbManager";
import { SegmentModel } from '../../models/segmentModel';
import { SdkAuthModel } from '../../models/sdkAuthModel';

export const createNeDbDataStore = async (): Promise<DataStoreManager> => {

    const neDbManager = await connectDb();

    if (!neDbManager) {
        throw Error("The neDbManager has not been properly initialized");
    }

    flagsManager.setNeDbManager(neDbManager);
    usersManager.setNeDbManager(neDbManager);
    segmentsManager.setNeDbManager(neDbManager);
    sdkAuthsManager.setNeDbManager(neDbManager);

    const dataStoreInstance = {
        addFlag: flagsManager.addFlag,
        deleteFlag: flagsManager.deleteFlag,
        getFlagById: flagsManager.getFlagById,
        getFlagByKey: flagsManager.getFlagByKey,
        getFlagByName: flagsManager.getFlagByName,
        getFlags: flagsManager.getFlags,
        updateFlag: flagsManager.updateFlag,

        getSegments: segmentsManager.getSegments,
        addSegment: segmentsManager.addSegment,
        deleteSegment: segmentsManager.deleteSegment,
        getSegmentById: segmentsManager.getSegmentById,
        getSegmentByKey: segmentsManager.getSegmentByKey,
        updateSegment: segmentsManager.updateSegment, 
         
        getSdkAuths: sdkAuthsManager.getSdkAuths,
        getSdkAuthByKey: sdkAuthsManager.getSdkAuthByKey,
        getSdkAuthByApiKey: sdkAuthsManager.getSdkAuthByApiKey,
        addSdkAuth: sdkAuthsManager.addSdkAuth,
        deleteSdkAuth: sdkAuthsManager.deleteSdkAuth,

        getUser: () => { throw new Error(); },
        getUserByEmail: () => { throw new Error(); },
        addUser: () => { throw new Error(); },
        updateUser: () => { throw new Error(); },
        deleteUser: () => { throw new Error(); },
    };

    return dataStoreInstance;
};

const connectDb = async (): Promise<NeDbManager> => {
    try {
        const neDbManager = getDbManager(SupportedDb.NeDB) as NeDbManager;
        neDbManager.flags = new AsyncNedb<FlagModel>({ filename: 'db.switchfeat.flags', autoload: true });
        neDbManager.users = new AsyncNedb<UserModel>({ filename: 'db.switchfeat.users', autoload: true });
        neDbManager.segments = new AsyncNedb<SegmentModel>({ filename: 'db.switchfeat.segments', autoload: true });
        neDbManager.sdkAuths = new AsyncNedb<SdkAuthModel>({ filename: 'db.switchfeat.sdkauths', autoload: true });

        console.log(`NeDBManager: connectDB: connected to local neDB`);

        return neDbManager;
    } catch (ex) {
        console.error(ex);
        throw new Error(`NeDBManager: connectDB: Unable to connect to DB: ${ex}`);
    }
};