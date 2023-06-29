import { UserModel, mongoManager, neDbManager } from "@switchfeat/core";

export const getUser = async (id: { userId?: string, email?: string }): Promise<UserModel | null> => {

    if (id.userId) {
        return await neDbManager.getUser(id.userId);
    }

    if (id.email) {
        return await neDbManager.getUserByEmail(id.email);
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