import { Collection } from "mongodb";
import { FlagModel } from "../../models/flagModel";
import { UserModel } from "../../models/userModel";
import AsyncNedb from "nedb-async";
import { createMongoDataStore } from "./mongoManager";
import { createNeDbDataStore } from "./neDBManager";
import { SegmentModel } from "../../models/segmentModel";
import { SdkAuthModel } from "../../models/sdkAuthModel";

export enum SupportedDb {
    Mongo = "mongo",
    NeDB = "nedb"
}

const initValues = {
    users: null,
    flags: null,
    segments: null
};

export type MongoManager = {
    flags: Collection<FlagModel> | null,
    users: Collection<UserModel> | null,
    segments: Collection<SegmentModel> | null,
    sdkAuths: Collection<SdkAuthModel> | null,
};

export type NeDbManager = {
    flags: AsyncNedb<FlagModel> | null,
    users: AsyncNedb<UserModel> | null,
    segments: AsyncNedb<SegmentModel> | null
    sdkAuths: AsyncNedb<SdkAuthModel> | null,
};

export type DataStoreManager = {

    // flags functions
    getFlags: (userId: string) => Promise<FlagModel[]>;
    getFlagByName: (name: string) => Promise<FlagModel>;
    getFlagById: (id: string) => Promise<FlagModel>;
    getFlagByKey: (key: string) => Promise<FlagModel>;
    addFlag: (flag: FlagModel) => Promise<boolean>;
    updateFlag: (flag: FlagModel) => Promise<boolean>;
    deleteFlag: (flag: FlagModel) => Promise<boolean>;

    // segments and conditions functions
    getSegments: (userId: string) => Promise<SegmentModel[]>;
    addSegment: (segment: SegmentModel) => Promise<boolean>;
    updateSegment: (segment: SegmentModel) => Promise<boolean>;
    deleteSegment: (segment: SegmentModel) => Promise<boolean>;
    getSegmentById: (id: string) => Promise<SegmentModel>;
    getSegmentByKey: (key: string) => Promise<SegmentModel>;

    // user functions
    getUser: (userId: string) => Promise<UserModel>;
    getUserByEmail: (email: string) => Promise<UserModel>;
    addUser: (user: UserModel) => Promise<boolean>;
    updateUser: (user: UserModel) => Promise<boolean>;
    deleteUser: (user: UserModel) => Promise<boolean>;

     // api auth functions
     getSdkAuths: (userKey?: string) => Promise<SdkAuthModel[]>;
     getSdkAuthByKey: (authKey: string) => Promise<SdkAuthModel>;
     addSdkAuth: (apiKey: SdkAuthModel) => Promise<boolean>;
     deleteSdkAuth: (apiKey: SdkAuthModel) => Promise<boolean>;
};

type DbManager = MongoManager | NeDbManager;

export const getDbManager = (id: SupportedDb): DbManager => {
    switch (id) {
        case SupportedDb.Mongo:
            return initValues as MongoManager;
        case SupportedDb.NeDB:
            return initValues as NeDbManager;
    }
};

export const getDataStore = async (id: SupportedDb): Promise<DataStoreManager> => {

    switch (id) {
        case SupportedDb.Mongo:
            return createMongoDataStore();
        case SupportedDb.NeDB:
            return await createNeDbDataStore();
    }
};
