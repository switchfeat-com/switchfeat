import { useCallback } from "react";

export type UseFetchParams<T, E> = {
    onSuccess: (data: T) => void;
    onError: (error: E) => void;
    onFinally?: () => void;
    reqBody?: BodyInit;
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    reqHeaders?: Record<string, string>;
};

export const useFetch = () => {
    const doFetch = useCallback(<T, E>(params: UseFetchParams<T, E>) => {
        (async () => {
            try {
                const reqHeaders: Record<string, string> = {
                    Accept: "application/json",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Origin": "true",
                    ...params.reqHeaders,
                };

                const resp = await fetch(params.url, {
                    method: params.method,
                    credentials: "include",
                    headers: reqHeaders,
                    body: params.method !== "GET" ? params.reqBody : null,
                });
                const respJson = await resp.json();
                if (respJson.success as boolean) {
                    const respData = respJson.data as T;
                    params.onSuccess(respData);
                } else {
                    const respData = respJson.error as E;
                    params.onError(respData);
                }
            } catch (ex) {
                console.log(ex);
                params.onError({} as E);
            } finally {
                params.onFinally ? params.onFinally() : () => {};
            }
        })();
    }, []);

    return {
        doFetch,
    };
};
