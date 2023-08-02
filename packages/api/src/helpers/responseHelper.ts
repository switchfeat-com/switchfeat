import { ApiResponseCode, ResponseModel } from "@switchfeat/core";
import { Request, Response } from "express";

export const setErrorResponse = (resp: Response, error: ApiResponseCode) => {
    console.log(error);
    resp.status(error.statusCode).json({
        success: false,
        error: error,
        data: null,
    } as ResponseModel<null>);
};

export const setSuccessResponse = <T extends object | null>(
    resp: Response,
    code: ApiResponseCode,
    data: T,
    req?: Request,
) => {
    console.log(code);

    const response = {
        success: true,
        data,
    } as ResponseModel<T>;

    if (req) {
        response.user = req.user;
        response.cookies = req.cookies;
    }

    resp.status(code.statusCode).json(response);
};
