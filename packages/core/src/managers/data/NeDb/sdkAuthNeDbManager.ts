import { SdkAuthModel } from "../../../models/sdkAuthModel";
import { NeDbManager } from "../dbManager";

let neDbManager: NeDbManager;

export const setNeDbManager = (neDbGlobalManager: NeDbManager) => {
    neDbManager = neDbGlobalManager;
};

export const getSdkAuths = async (): Promise<SdkAuthModel[]> =>
    neDbManager.sdkAuths!.asyncFind({});

export const getSdkAuthByKey = async (key: string): Promise<SdkAuthModel> =>
    neDbManager.sdkAuths!.asyncFindOne({
        key,
    });

export const getSdkAuthByApiKey = async (
    apiKey: string,
): Promise<SdkAuthModel> =>
    neDbManager.sdkAuths!.asyncFindOne({
        apiKey,
    });

export const addSdkAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    try {
        const response = await neDbManager.sdkAuths!.asyncInsert(auth);
        return !!response;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteSdkAuth = async (auth: SdkAuthModel): Promise<boolean> => {
    try {
        const response = await neDbManager.sdkAuths!.asyncRemove({
            _id: auth._id,
        });
        return !!response;
    } catch (ex) {
        console.error(ex);
        return false;
    }
};
