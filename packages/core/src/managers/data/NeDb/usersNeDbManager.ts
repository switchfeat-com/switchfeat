import { UserModel } from "../../../models/userModel";
import { NeDbManager } from "../dbManager";

let neDbManager: NeDbManager;

export const setNeDbManager = (neDbGlobalManager: NeDbManager) => {
    neDbManager = neDbGlobalManager;
};

export const getUser = async (userId: string): Promise<UserModel> =>
    neDbManager.users!.asyncFindOne({
        _id: userId,
    });

export const getUserByEmail = async (email: string): Promise<UserModel> => {
    return await neDbManager.users!.asyncFindOne({
        email
    });
};

export const addUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await neDbManager.users!.asyncInsert(user);
        return (!!response);
    } catch (ex) {
        return false;
    }
};

export const updateUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await neDbManager.users!.asyncUpdate({ _id: user._id }, { $set: user });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteUser = async (user: UserModel): Promise<boolean> => {
    try {
        const response = await neDbManager.users!.asyncRemove({ _id: user._id });
        return (!!response);
    } catch (ex) {
        return false;
    }
};