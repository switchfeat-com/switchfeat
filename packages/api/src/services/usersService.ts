import { dbManager, UserModel } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (manager: Promise<dbManager.DataStoreManager>) => {
    manager.then(data => dataStoreManager = data);
};

export const getUser = async (search: { userId?: string, email?: string }): Promise<UserModel | null> => {

    if (search.userId) {
        return await dataStoreManager.getUser(search.userId);
    }

    if (search.email) {
        return await dataStoreManager.getUserByEmail(search.email);
    }

    return null;
};

export const addUser = async (user: UserModel ) : Promise<boolean> => {
     
    if (!await getUser({email: user.email})) {
        return await dataStoreManager.addUser(user);
    }

    return false;
};

export const updateUser = async (user: UserModel ) : Promise<boolean> => {
     
    if (await getUser({email: user.email})) {
        return await dataStoreManager.updateUser(user);
    }

    return false;
};