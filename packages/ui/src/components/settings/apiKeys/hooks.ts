import { useEffect, useState } from "react";
import * as keys from "../../../config/keys";
import { SdkAuthModel } from "../../../models/SdkAuthModel";
import { useFetch } from "../../../hooks/useFetch";

export type UseApiKeysProps = {
    sdkAuths: SdkAuthModel[];
    generateApiKey: (keyName: string, onError: () => void, onSuccess: (key: SdkAuthModel) => void) => Promise<string | null>;
    setRefreshSdkAuths: (state: boolean) => void;
    loading: boolean;
    deleteApiKey: (sdkAuthKey: string, onError: () => void, onSuccess: () => void) => Promise<boolean>;
    doRefreshSdkAuths: () => void;
};

export const useApiKeys = (): UseApiKeysProps => {
    const [sdkAuths, setSdkAuths] = useState<SdkAuthModel[]>([]);
    const [refreshSdkAuths, setRefreshSdkAuths] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
   
    const { doFetch } = useFetch();

    useEffect(() => {
        setLoading(true);

        const onFetchSuccess = (fetchResp: SdkAuthModel[]) => {
            setSdkAuths([]);
            const allData: SdkAuthModel[] = [];
            fetchResp.forEach((item: SdkAuthModel) => {
                allData.push({
                    name: item.name,
                    description: item.description,
                    createdOn: item.createdOn,
                    updatedOn: item.updatedOn,
                    key: item.key,
                    expiresOn: item.expiresOn,
                    apiKey: item.apiKey
                });
            });
            setSdkAuths([...allData]);
            setLoading(false);
        };

        doFetch<SdkAuthModel[], unknown>({
            onSuccess: onFetchSuccess,
            onError: () => { },
            url: `${keys.CLIENT_HOME_PAGE_URL}/api/sdk/auth/`,
            method: "GET"
        });
    }, [doFetch, refreshSdkAuths]);

    const generateApiKey = async (keyName: string, onError: () => void, onSuccess: (key: SdkAuthModel) => void): Promise<string | null> => {
        const formData = new FormData();
        formData.append('keyName', keyName);

        try {
         
            doFetch({
                onSuccess: (resp: SdkAuthModel) => { onSuccess(resp);},
                onError: onError,
                reqBody: formData,
                url: `${keys.CLIENT_HOME_PAGE_URL}/api/sdk/auth/`,
                method: "POST"
            });

        } catch (error) {
            console.log(error);
        }

        return null;
    };

    const deleteApiKey = async (sdkAuthKey: string, onError: () => void, onSuccess: () => void): Promise<boolean> => {
        const formData = new FormData();
        formData.append('sdkAuthKey', sdkAuthKey);

        try {
            doFetch<SdkAuthModel[], unknown>({
                onSuccess: () => { doRefreshSdkAuths(); onSuccess();},
                onError: onError,
                url: `${keys.CLIENT_HOME_PAGE_URL}/api/sdk/auth/`,
                method: "DELETE",
                reqBody: formData
            });

            return true;
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
        doRefreshSdkAuths
    };
};