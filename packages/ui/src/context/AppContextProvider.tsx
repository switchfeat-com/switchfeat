import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AppContext, UserState, initialState } from "./AppContext";
import * as keys from "../config/keys";
import { useFetch } from "../hooks/useFetch";
import { UserModel } from "../models/UserModel";

const appContext = createContext<AppContext>(initialState);

export const AppContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [userData, setUserData] = useState<UserState>();
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    const { doFetch } = useFetch();

    const handleLoginClick = (provider: string): void => {
        window.open(`${keys.CLIENT_HOME_PAGE_URL}/auth/${provider}`, "_self");
    };

    const handleLogoutClick = (): void => {
        window.open(`${keys.CLIENT_HOME_PAGE_URL}/auth/logout`, "_self");
    };

    useEffect(() => {
        doFetch<UserModel, unknown>({
            onSuccess: (fetchResp) => {
                setUserData({
                    authenticated: true,
                    userData: fetchResp
                });
            },
            onError: () => {
                setUserData({
                    authenticated: false,
                    error: "Failed to authenticate user"
                });
            },
            onFinally: () => setLoadingInitial(false),
            url: `${keys.CLIENT_HOME_PAGE_URL}/auth/is-auth/`,
            method: "GET"
        });
    }, [doFetch]);

    return (
        <appContext.Provider value={{
            authContext: {
                userData,
                loginClick: handleLoginClick,
                logoutClick: handleLogoutClick
            }

        }}>
            {!loadingInitial && props.children}
        </appContext.Provider>
    );
};

export const useAppContext = (): AppContext => useContext(appContext);
