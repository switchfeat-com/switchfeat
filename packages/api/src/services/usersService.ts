import { UserModel, mongoManager, neDbManager } from "@switchfeat/core";

export const getUser = async (search: { userId?: string, email?: string }): Promise<UserModel | null> => {

    if (search.userId) {
        return await neDbManager.getUser(search.userId);
    }

    if (search.email) {
        return await neDbManager.getUserByEmail(search.email);
    }

    return null;
}

export const addUser = async (user: UserModel ) : Promise<boolean> => {
     
    if (!await getUser({email: user.email})) {
        return await neDbManager.addUser(user);
    }

    return false;
}

export const updateUser = async (user: UserModel ) : Promise<boolean> => {
     
    if (await getUser({email: user.email})) {
        return await neDbManager.updateUser(user);
    }

    return false;
}