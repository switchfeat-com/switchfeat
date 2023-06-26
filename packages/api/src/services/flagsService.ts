import { FlagModel, mongoManager } from "@switchfeat/core";

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
     return await mongoManager.getFlags(userId);
}