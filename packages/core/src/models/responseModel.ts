import { ApiResponseCode } from "./apiResponseCodes";

export type ResponseModel<T extends object | null> = {
    success: boolean;
    error?: ApiResponseCode;
    data: T,
    user?: unknown;
    cookies?: unknown;
};