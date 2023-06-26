import { UserModel, mongoManager } from "@switchfeat/core";

export const getUser = async (id: { userId?: string, email?: string }): Promise<UserModel | null> => {

    if (id.userId) {
        return await mongoManager.getUser(id.userId);
    }

    if (id.email) {
        return await mongoManager.getUserByEmail(id.email);
    }

    return null;
}

export const addUser = async (user: UserModel ) : Promise<boolean> => {
     
    if (!await getUser({email: user.email})) {
        return await mongoManager.addUser(user);
    }

    return false;
}

export const updateUser = async (user: UserModel ) : Promise<boolean> => {
     
    if (await getUser({email: user.email})) {
        return await mongoManager.updateUser(user);
    }

    return false;
}