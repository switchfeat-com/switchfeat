import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AppContext, UserState, initialState } from "./AppContext";
import * as keys from "../config/keys";
import { NotificationsPanel, NotificationsProvider } from "../services/notifications";
import { Portal } from "@headlessui/react";
import { fetchGet } from "../utils/api";

const appContext = createContext<AppContext>(initialState);

export const AppContextProvider: React.FC<{ children: ReactNode }> = (props) => {

    const [userData, setUserData] = useState<UserState>();
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
    
    const handleLoginClick = (provider: string) => {
        window.open(`${keys.CLIENT_HOME_PAGE_URL}/auth/${provider}`, "_self");
    };

    const handleLogoutClick = () => {
        window.open(`${keys.CLIENT_HOME_PAGE_URL}/auth/logout`, "_self");
    };

    useEffect(() => {
        fetchGet('/auth/is-auth').then((res: any) => {
            setUserData({
                authenticated: true,
                userData: res.user
            });
        }).catch((err: any) => {
            console.log('Not authenticated');
            setUserData({
                authenticated: false,
                error: "Failed to authenticate user"
            });
        }).finally(() => {
            setLoadingInitial(false);
        });
    }, []);

    return (

        <appContext.Provider value={{ 
            authContext: {
                userData: userData,
                loginClick: handleLoginClick, 
                logoutClick: handleLogoutClick, 
            }
           
        }}>
            <NotificationsProvider>
                {!loadingInitial && props.children}
                <Portal>
                    <NotificationsPanel />
                </Portal>
            </NotificationsProvider>
        </appContext.Provider>
    );
    
}

export const useAppContext = () => useContext(appContext);