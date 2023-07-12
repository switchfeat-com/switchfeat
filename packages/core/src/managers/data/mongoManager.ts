
import { MongoClient, ObjectId } from "mongodb";
import { keys } from "../../config/keys";
import { DataStoreManager, MongoManager, SupportedDb, getDbManager } from "./dbManager";

let dataStoreInstance: DataStoreManager;

export const createMongoDataStore = async (): Promise<DataStoreManager> => {

    const mongoManager = await connectDb();

    if (!mongoManager) {
        throw Error("The neDbManager has not been properly initialized");
    }

    if (!dataStoreInstance) {
        dataStoreInstance = {
            addFlag: () => { throw new Error(); },
            deleteFlag: () => { throw new Error(); },
            getFlagById: () => { throw new Error(); },
            getFlagByKey: () => { throw new Error(); },
            getFlagByName: () => { throw new Error(); },
            getFlags: () => { throw new Error(); },
            updateFlag: () => { throw new Error(); },
            getUser: () => { throw new Error(); },
            getUserByEmail: () => { throw new Error(); },
            addUser: () => { throw new Error(); },
            updateUser: () => { throw new Error(); },
            deleteUser: () => { throw new Error(); },
            addCondition: () => { throw new Error(); },
            deleteCondition: () => { throw new Error(); },
            getConditionById: () => { throw new Error(); },
            updateCondition: () => { throw new Error(); },
            getConditions: () => { throw new Error(); },
        };
    }
    return dataStoreInstance;
};

const connectDb = async () : Promise<MongoManager> => {
    try {
        const client: MongoClient = new MongoClient(keys.MONGODB_URI);

        await client.connect();
        console.log(`MongoManager: connectDB: connected to mongo db on: ${keys.MONGODB_URI}`);

        const db = client.db();

        const mongoDbManager = getDbManager(SupportedDb.Mongo) as MongoManager;
        mongoDbManager.users = db.collection("users");
        mongoDbManager.flags = db.collection("flags");
        mongoDbManager.conditions = db.collection("conditions");

        return mongoDbManager;

    } catch (ex) {
        console.log(ex);
        throw new Error(`MongoManager: connectDB: Unable to connect to DB: ${ex}`);
    }
};