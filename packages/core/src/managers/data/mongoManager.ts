
import { Collection, MongoClient, ObjectId } from "mongodb";
import { keys } from "../../config/keys";
import { FlagModel } from "../../models/flagModel";
import { ConditionModel } from "../../models/conditionModel";
import { UserModel } from "../../models/userModel";

export interface dbManager {
    flags: Collection<FlagModel> | null,
    users: Collection<UserModel> | null,
    conditions: Collection<ConditionModel> | null
}

const dbManager: dbManager = {
    users: null,
    flags: null,
    conditions: null
}

export const connectDB = async () => {
    try {
        const client: MongoClient = new MongoClient(keys.MONGODB_URI);

        await client.connect();
        console.log(`connectDB: connected to mongo db on: ${keys.MONGODB_URI}`);

        const db = client.db();
        dbManager.users = db.collection("users");
        dbManager.flags = db.collection("flags");
        dbManager.conditions = db.collection("conditions");

    } catch (ex) {
        console.log(ex);
        throw new Error(`connectDB: Unable to connect to DB: ${ex}`);
    }
};

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
    return (await dbManager.flags?.find({
        "userId": userId
    }).toArray()) as FlagModel[];
};

export const getUser = async (userId: string): Promise<UserModel> => {
    return (await dbManager.users?.findOne({
        _id: new ObjectId(userId)
    })) as UserModel;
};

export const getUserByEmail = async (email: string): Promise<UserModel> => {
    return (await dbManager.users?.findOne({
        email: email
    })) as UserModel;
};

export const addUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await dbManager.users?.insertOne(user);
        return (!!response);
    } catch(ex) {
        return false;
    }
};

export const updateUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await dbManager.users?.updateOne({ _id: new ObjectId(user.id) }, { $set: user } );
        return (!!response);
    } catch(ex) {
        return false;
    }
};

export const deleteUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await dbManager.users?.deleteOne({ _id: new ObjectId(user.id) });
        return (!!response && response.deletedCount > 0);
    } catch(ex) {
        return false;
    }
};