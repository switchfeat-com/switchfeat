
import { Collection, MongoClient } from "mongodb";
import { keys } from "../../config/keys";
import { FlagModel } from "../../models/flagModel";
import { ConditionModel } from "../../models/conditionModel";

export interface dbManager {
    flags: Collection<FlagModel>,
    conditions: Collection<ConditionModel>
}

export const dbManager : dbManager = { 
    flags: null,
    conditions: null
}

export const connectDB = async () => {

    try {
        const client: MongoClient = new MongoClient(keys.MONGODB_URI);
  
        await client.connect();
  
        console.log(`connectDB: connected to mongo db on: ${keys.MONGODB_URI}`);

        const db = client.db();

        dbManager.flags = db.collection("flags");
        dbManager.conditions = db.collection("conditions");

    } catch (ex) {
        console.log(ex);
        throw new Error(`connectDB: Unable to connect to DB: ${ex}`);
    }
};