import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AppContext, UserState, initialState } from "./AppContext";
import * as keys from "../config/keys";

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
        fetch(`${keys.CLIENT_HOME_PAGE_URL}/auth/is-auth`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true"
            }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } 
            throw new Error("failed to authenticate user");
        }).then(responseJson => {
            setUserData({
                authenticated: true,
                userData: responseJson.user
            });
            
        }).catch(error => {
                setUserData({
                    authenticated: false,
                    error: "Failed to authenticate user"
                });
            })
            .finally(() => setLoadingInitial(false));
    }, []);

    return (

        <appContext.Provider value={{ 
            authContext: {
                userData: userData,
                loginClick: handleLoginClick, 
                logoutClick: handleLogoutClick, 
            }
           
        }}>
            {!loadingInitial && props.children}
        </appContext.Provider>
    );
    
}

export const useAppContext = () => useContext(appContext);