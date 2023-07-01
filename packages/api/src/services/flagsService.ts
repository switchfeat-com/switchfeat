import { FlagModel, mongoManager, neDbManager } from "@switchfeat/core";

export const getFlags = async (userId: string): Promise<FlagModel[]> => {
     return await neDbManager.getFlags(userId);
}

export const getFlag = async (search: { name?: string, id?: string }): Promise<FlagModel | null> => {

     if (search.name) {
         return await neDbManager.getFlagByName(search.name);
     }
 
     if (search.id) {
         return await neDbManager.getFlagById(search.id);
     }
 
     return null;
 }

export const addFlag = async (flag: FlagModel ) : Promise<boolean> => {
     
     if (!await getFlag({name: flag.name})) {
         return await neDbManager.addFlag(flag);
     }
 
     return false;
 }
 
 export const updateUser = async (flag: FlagModel ) : Promise<boolean> => {
      
     if (await getFlag({name: flag.name})) {
         return await neDbManager.updateFlag(flag);
     }
 
     return false;
 }