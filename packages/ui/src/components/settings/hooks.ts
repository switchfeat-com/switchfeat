import { useEffect, useState } from "react";
import * as keys from "../../config/keys";
import { SdkAuthModel } from "../../models/SdkAuthModel";

export const useApiKeys = (): { sdkAuths: SdkAuthModel[] } => {
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
                "Access-Control-Allow-Origin": "true"
            }
        }).then(async resp => {
            return resp.json();
        }).then(respJson => {
            setSdkAuths([]);
            const allData: SdkAuthModel[] = [];
            respJson.data.forEach((item: SdkAuthModel) => {
                allData.push({
                    name: item.name,
                    description: item.description,
                    createdOn: item.createdOn,
                    updatedOn: item.updatedOn,
                    key: item.key,
                    expiresOn: item.expiresOn
                });
            });

            setSdkAuths(allData);
            setLoading(false);
        }).catch(ex => { console.log(ex); });
    }, [refreshSdkAuths]);


    return {
        sdkAuths
    };

};