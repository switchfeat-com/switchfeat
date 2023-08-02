import { useCallback } from "react";

export type UseFetchParams<T> = {
    onSuccess: (data: T) => void;
    onError: () => void;
    reqBody?: Record<string, string>;
    url: string;
    method: ("GET" | "POST" | "PUT" | "DELETE");
    reqHeaders?: Record<string, string>;
};

export const useFetch = () => { 
    
    const doFetch = useCallback(<T>(params: UseFetchParams<T>) => { (async () => {
        try {
            const reqHeaders: Record<string, string> = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true",
                ...params.reqHeaders
            };

            const resp = await fetch(params.url, {
                method: params.method,
                credentials: "include",
                headers: reqHeaders
            });

            const respJson = (await resp.json()).data as T;
            params.onSuccess(respJson);
        } catch (ex) {
            console.log(ex);
            params.onError();
        }
    })(); }, []);
       
    return {
        doFetch
    };
};