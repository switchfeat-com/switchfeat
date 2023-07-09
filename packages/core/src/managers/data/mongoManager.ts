
import { MongoClient, ObjectId } from "mongodb";
import { keys } from "../../config/keys";
import { FlagModel } from "../../models/flagModel";
import { UserModel } from "../../models/userModel";
import { DataStoreManager, MongoManager, SupportedDb, getDbProvider } from "./dbManager";


let mongoDbManager: MongoManager | null = null;

export const createMongoDataStore = (): DataStoreManager => {
    return {
        connectDb: connectDb,
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
        deleteUser: () => { throw new Error(); }
    };
}

const connectDb = async () => {
    try {
        const client: MongoClient = new MongoClient(keys.MONGODB_URI);

        await client.connect();
        console.log(`MongoManager: connectDB: connected to mongo db on: ${keys.MONGODB_URI}`);

        const db = client.db();

        mongoDbManager = getDbProvider(SupportedDb.Mongo) as MongoManager;
        mongoDbManager.users = db.collection("users");
        mongoDbManager.flags = db.collection("flags");
        mongoDbManager.conditions = db.collection("conditions");

    } catch (ex) {
        console.log(ex);
        throw new Error(`MongoManager: connectDB: Unable to connect to DB: ${ex}`);
    }
};

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
    return (await mongoDbManager!.flags?.find({
        "userId": userId
    }).toArray()) as FlagModel[];
};

export const getUser = async (userId: string): Promise<UserModel> => {
    return (await mongoDbManager!.users?.findOne({
        _id: new ObjectId(userId)
    })) as UserModel;
};

export const getUserByEmail = async (email: string): Promise<UserModel> => {
    return (await mongoDbManager!.users?.findOne({
        email: email
    })) as UserModel;
};

export const addUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await mongoDbManager!.users?.insertOne(user);
        return (!!response);
    } catch (ex) {
        return false;
    }
};

export const updateUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await mongoDbManager!.users?.updateOne({ _id: new ObjectId(user._id) }, { $set: user });
        return (!!response);
    } catch (ex) {
        return false;
    }
};

export const deleteUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await mongoDbManager!.users?.deleteOne({ _id: new ObjectId(user._id) });
        return (!!response && response.deletedCount > 0);
    } catch (ex) {
        return false;
    }
};