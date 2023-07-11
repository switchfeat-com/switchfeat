import { UserModel } from "../models/UserModel";

export interface AppContext {
   authContext: AuthContext;
}

export interface AuthContext {
    userData: UserState | undefined;
    loginClick: (provider: string) => void;
    logoutClick: () => void;
}

export interface UserState {
    userData?: UserModel;
    error?: string;
    authenticated: boolean;
}

export const initialState: AppContext = {
    authContext: {
        userData: {
            authenticated: false,
        },
        loginClick: () => {},
        logoutClick: () => {},
    }
};
