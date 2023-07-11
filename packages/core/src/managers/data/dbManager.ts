import { Collection } from "mongodb";
import { ConditionModel } from "../../models/conditionModel";
import { FlagModel } from "../../models/flagModel";
import { UserModel } from "../../models/userModel";
import AsyncNedb from "nedb-async";
import { createMongoDataStore } from "./mongoManager";
import { createNeDbDataStore } from "./neDBManager";

export enum SupportedDb {
    Mongo = "mongo",
    NeDB = "nedb"
}

const initValues = {
    users: null,
    flags: null,
    conditions: null
};

export type MongoManager = {
    flags: Collection<FlagModel> | null,
    users: Collection<UserModel> | null,
    conditions: Collection<ConditionModel> | null,
};

export type NeDbManager = {
    flags: AsyncNedb<FlagModel> | null,
    users: AsyncNedb<UserModel> | null,
    conditions: AsyncNedb<ConditionModel> | null,
};

export type DataStoreManager = {
    connectDb: () => void;

    // flags functions
    getFlags: (userId: string) => Promise<FlagModel[]>;
    getFlagByName: (name: string) => Promise<FlagModel>;
    getFlagById: (id: string) => Promise<FlagModel>;
    getFlagByKey: (key: string) => Promise<FlagModel>;
    addFlag: (flag: FlagModel) => Promise<boolean>;
    updateFlag: (flag: FlagModel) => Promise<boolean>;
    deleteFlag: (flag: FlagModel) => Promise<boolean>;

    // user functions
    getUser: (userId: string) => Promise<UserModel>;
    getUserByEmail: (email: string) => Promise<UserModel>;
    addUser: (user: UserModel) => Promise<boolean>;
    updateUser: (user: UserModel) => Promise<boolean>;
    deleteUser: (user: UserModel) => Promise<boolean>;
};

type DbManager = MongoManager | NeDbManager;

export const getDbProvider = (id: SupportedDb): DbManager => {
    switch (id) {
        case SupportedDb.Mongo:
            return initValues as MongoManager;
        case SupportedDb.NeDB:
            return initValues as NeDbManager;
    }
};

export const getDataStore = (id: SupportedDb): DataStoreManager => {
    switch (id) {
        case SupportedDb.Mongo:
            return createMongoDataStore();
        case SupportedDb.NeDB:
            return createNeDbDataStore();
    }
};
