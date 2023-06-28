import { UserModel } from "@switchfeat/core"

export interface AppContext {
   authContext: AuthContext
}

export interface AuthContext {
    userData: UserState | undefined,
    loginClick?: () => void,
    logoutClick?: () => void
}

export interface UserState  {
    userData?: UserModel,
    error?: string,
    authenticated: boolean
}

export const initialState: AppContext = {
    authContext: {
        userData: {
            authenticated: false
        },
    }
}