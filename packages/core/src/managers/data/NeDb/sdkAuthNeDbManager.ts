import { SdkAuthModel } from "../../../models/sdkAuthModel";
import { NeDbManager } from "../dbManager";

let neDbManager: NeDbManager;

export const setNeDbManager = (neDbGlobalManager: NeDbManager) => {
    neDbManager = neDbGlobalManager;
};

export const getsdkAuths = async (userKey?: string): Promise<SdkAuthModel[]> => neDbManager.sdkAuths!.asyncFind({});

export const getApiAuthByKey = async (authKey: string): Promise<SdkAuthModel> => neDbManager.sdkAuths!.asyncFindOne({
    authKey,
});

export const addApiAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    try {
        const response = await neDbManager.sdkAuths!.asyncInsert(auth);
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteApiAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    try {
        const response = await neDbManager.sdkAuths!.asyncRemove({ _id: auth._id });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};