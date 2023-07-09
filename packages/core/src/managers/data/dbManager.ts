import { Collection } from "mongodb";
import { ConditionModel } from "../../models/conditionModel";
import { FlagModel } from "../../models/flagModel";
import { UserModel } from "../../models/userModel";
import AsyncNedb from "nedb-async";

export enum SupportedDb {
    Mongo = "mongo",
    NeDB = "nedb"
}

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

type DbManager = MongoManager | NeDbManager;

const initValues = {
    users: null,
    flags: null,
    conditions: null
};

export const getDbProvider = (id: SupportedDb): DbManager => {
    switch (id) {
        case "mongo":
            return initValues as MongoManager
        case "nedb":
            return initValues as NeDbManager
    }

    throw new Error(`Unable to generate a DB provider for: ${id}`);
}

