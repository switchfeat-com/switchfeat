import { useEffect, useState } from "react";
import * as keys from "../../../config/keys";
import { SdkAuthModel } from "../../../models/SdkAuthModel";

export type UseApiKeysProps = {
    sdkAuths: SdkAuthModel[];
    generateApiKey: (keyName: string) => Promise<string | null>;
    setRefreshSdkAuths: (state: boolean) => void;
    loading: boolean;
    deleteApiKey: (sdkAuthKey: string) => Promise<boolean>;
    doRefreshSdkAuths: () => void;
};

export const useApiKeys = (): UseApiKeysProps => {
    const [sdkAuths, setSdkAuths] = useState<SdkAuthModel[]>([]);
    const [refreshSdkAuths, setRefreshSdkAuths] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/sdk/auth/`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true",
            },
        })
            .then(async (resp) => {
                return resp.json();
            })
            .then((respJson) => {
                setSdkAuths([]);
                const allData: SdkAuthModel[] = [];
                respJson.data.forEach((item: SdkAuthModel) => {
                    allData.push({
                        name: item.name,
                        description: item.description,
                        createdOn: item.createdOn,
                        updatedOn: item.updatedOn,
                        key: item.key,
                        expiresOn: item.expiresOn,
                        apiKey: item.apiKey,
                    });
                });
                setSdkAuths([...allData]);
                setLoading(false);
            })
            .catch((ex) => {
                console.log(ex);
            });
    }, [refreshSdkAuths]);

    const generateApiKey = async (keyName: string): Promise<string | null> => {
        const formData = new FormData();
        formData.append("keyName", keyName);

        try {
            const resp = await fetch(
                `${keys.CLIENT_HOME_PAGE_URL}/api/sdk/auth/`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Origin": "true",
                    },
                    body: formData,
                },
            );
            const respJson = await resp.json();

            if (respJson.success) {
                setSdkAuths((apiKeys) => [...apiKeys, respJson.data]);
                // doRefreshSdkAuths();
                return respJson.data.apikey;
            }
        } catch (error) {
            console.log(error);
        }

        return null;
    };

    const deleteApiKey = async (sdkAuthKey: string): Promise<boolean> => {
        const formData = new FormData();
        formData.append("sdkAuthKey", sdkAuthKey);

        try {
            const resp = await fetch(
                `${keys.CLIENT_HOME_PAGE_URL}/api/sdk/auth/`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Origin": "true",
                    },
                    body: formData,
                },
            );
            const respJson = await resp.json();

            if (respJson.success) {
                doRefreshSdkAuths();
            }

            return respJson.success;
        } catch (error) {
            console.log(error);
        }

        return false;
    };

    const doRefreshSdkAuths = () => {
        setRefreshSdkAuths(!refreshSdkAuths);
    };

    return {
        sdkAuths,
        generateApiKey,
        setRefreshSdkAuths,
        loading,
        deleteApiKey,
        doRefreshSdkAuths,
    };
};
