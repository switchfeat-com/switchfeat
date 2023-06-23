import { FlagModel, mongoManager } from "@switchfeat/core";

export const getFlags = async (userId: string): Promise<FlagModel[]> => {

     const coll = (await mongoManager.dbManager.flags.find({}).toArray()) as FlagModel[];
     console.log(coll);
     return coll;
}