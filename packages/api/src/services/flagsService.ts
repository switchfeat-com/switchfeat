import { FlagModel, mongoManager, neDbManager } from "@switchfeat/core";

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
     return await neDbManager.getFlags(userId);
}