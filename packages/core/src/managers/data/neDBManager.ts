import AsyncNedb from 'nedb-async';

import { FlagModel } from "../../models/flagModel";
import { ConditionModel } from "../../models/conditionModel";
import { UserModel } from "../../models/userModel";
import { DataStoreManager, NeDbManager, SupportedDb, getDbManager } from "./dbManager";
import * as flagsManager from "./NeDb/flagsNeDbManager";
import * as usersManager from "./NeDb/usersNeDbManager";
import * as conditionsManager from "./NeDb/conditionsNeDbManager";
import * as segmentsManager from "./NeDb/segmentsNeDbManager";
import { SegmentModel } from '../../models/segmentModel';


let dataStoreInstance: DataStoreManager;

export const createNeDbDataStore = async (): Promise<DataStoreManager> => {

    const neDbManager = await connectDb();

    if (!neDbManager) {
        throw Error("The neDbManager has not been properly initialized");
    }

    if (!dataStoreInstance) {

        flagsManager.setNeDbManager(neDbManager);
        usersManager.setNeDbManager(neDbManager);
        conditionsManager.setNeDbManager(neDbManager);
        
        dataStoreInstance = {
            addFlag: flagsManager.addFlag,
            deleteFlag: flagsManager.deleteFlag,
            getFlagById: flagsManager.getFlagById,
            getFlagByKey: flagsManager.getFlagByKey,
            getFlagByName: flagsManager.getFlagByName,
            getFlags: flagsManager.getFlags,
            updateFlag: flagsManager.updateFlag,

            getConditions: conditionsManager.getConditions,
            addCondition: conditionsManager.addCondition,
            deleteCondition: conditionsManager.deleteCondition,
            getConditionById: conditionsManager.getConditionById,
            getConditionByKey: conditionsManager.getConditionByKey,
            updateCondition: conditionsManager.updateCondition,

            getSegments: segmentsManager.getSegments,
            addSegment: segmentsManager.addSegment,
            deleteSegment: segmentsManager.deleteSegment,
            getSegmentById: segmentsManager.getSegmentById,
            getSegmentByKey: segmentsManager.getSegmentByKey,
            updateSegment: segmentsManager.updateSegment,

            getUser: () => { throw new Error(); },
            getUserByEmail: () => { throw new Error(); },
            addUser: () => { throw new Error(); },
            updateUser: () => { throw new Error(); },
            deleteUser: () => { throw new Error(); },
        };
    }
    return dataStoreInstance;
};

const connectDb = async () : Promise<NeDbManager> => {
    try {
        const neDbManager = getDbManager(SupportedDb.NeDB) as NeDbManager;
        neDbManager.flags = new AsyncNedb<FlagModel>({ filename: 'db.switchfeat.flags', autoload: true });
        neDbManager.conditions = new AsyncNedb<ConditionModel>({ filename: 'db.switchfeat.conditions', autoload: true });
        neDbManager.users = new AsyncNedb<UserModel>({ filename: 'db.switchfeat.users', autoload: true });
        neDbManager.segments = new AsyncNedb<SegmentModel>({ filename: 'db.switchfeat.segments', autoload: true });

        console.log(`NeDBManager: connectDB: connected to local neDB`);

        return neDbManager;
    } catch (ex) {
        console.error(ex);
        throw new Error(`NeDBManager: connectDB: Unable to connect to DB: ${ex}`);
    }
};