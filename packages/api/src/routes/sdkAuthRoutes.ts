import { Router } from "express";
import { Request, Response } from "express";
import multer from "multer";
import * as sdkAuthService from "../services/sdkAuthService";
import * as auth from "../managers/auth/passportAuth";
import {
    ApiResponseCodes,
    dateHelper,
    dbManager,
    entityHelper,
} from "@switchfeat/core";
import {
    setErrorResponse,
    setSuccessResponse,
} from "../helpers/responseHelper";

export const sdkAuthRoutesWrapper = (
    storeManager: Promise<dbManager.DataStoreManager>,
): Router => {
    sdkAuthService.setDataStoreManager(storeManager);

    const upload = multer();
    const apiAuthRoutes = Router();
    apiAuthRoutes.get(
        "/api/sdk/auth/",
        auth.isAuthenticated,
        async (req: Request, res: Response) => {
            try {
                const sdkAuths = await sdkAuthService.getSdkAuths();

                // hide the full apikey for security reasons
                sdkAuths.forEach((x) => {
                    x.apiKey =
                        x.apiKey.substring(0, 3) +
                        "···" +
                        x.apiKey.substring(
                            x.apiKey.length - 5,
                            x.apiKey.length - 1,
                        );
                });

                setSuccessResponse(
                    res,
                    ApiResponseCodes.Success,
                    sdkAuths,
                    req,
                );
            } catch (error) {
                setErrorResponse(res, ApiResponseCodes.GenericError);
            }
        },
    );

    apiAuthRoutes.post(
        "/api/sdk/auth/",
        upload.any(),
        auth.isAuthenticated,
        async (req: Request, res: Response) => {
            console.log("received sdkAuth add: " + JSON.stringify(req.body));
            const keyName = req.body.keyName;
            const keyExpiresOn = req.body.keyExpiresOn;

            if (!keyName) {
                setErrorResponse(res, ApiResponseCodes.InputMissing);
                return;
            }

            const apiAuthKey = entityHelper.generateGuid("apikey");

            const alreadyInDb = await sdkAuthService.getSdkAuth({
                key: apiAuthKey,
            });

            setSuccessResponse(res, ApiResponseCodes.Success, {apiKey: apiKey}, req);
        } else {
            setErrorResponse(res, ApiResponseCodes.SdkAuthKeyNotFound);
        }
    }); 
   

    apiAuthRoutes.delete("/api/sdk/auth/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received sdkAuth delete: " + JSON.stringify(req.body));

            const apiAuthKey = req.body.sdkAuthKey;

            if (!apiAuthKey) {
                setErrorResponse(res, ApiResponseCodes.InputMissing);
                return;
            }

            const alreadyInDb = await sdkAuthService.getSdkAuth({
                key: apiAuthKey,
            });

            if (alreadyInDb) {
                await sdkAuthService.deleteSdkAuth(alreadyInDb);
                setSuccessResponse(res, ApiResponseCodes.Success, null, req);
            } else {
                setErrorResponse(res, ApiResponseCodes.SdkAuthKeyNotFound);
            }
        },
    );

    return apiAuthRoutes;
};
