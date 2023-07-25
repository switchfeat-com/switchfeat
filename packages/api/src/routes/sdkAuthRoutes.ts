import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';
import * as sdkAuthService from "../services/sdkAuthService";
import * as auth from "../managers/auth/passportAuth";
import { ApiResponseCodes, dateHelper, dbManager, entityHelper } from "@switchfeat/core";
import { setErrorResponse, setSuccessResponse } from "../helpers/responseHelper";

export const sdkAuthRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>) : Router  => {

    sdkAuthService.setDataStoreManager(storeManager);

    const upload = multer();
    const apiAuthRoutes = Router();
    apiAuthRoutes.get("/api/sdk/auth/", auth.isAuthenticated, async (req: Request, res: Response) => {

        try {
            const sdkAuths = await sdkAuthService.getSdkAuths("");
            res.json({
                success: true,
                user: req.user,
                cookies: req.cookies,
                sdkAuths: sdkAuths
            });
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    apiAuthRoutes.post("/api/sdk/auth/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received sdkAuth add: " + JSON.stringify(req.body));
        const keyName = req.body.keyName;
        const keyDescription = req.body.keyDescription;
        const keyExpiresOn = req.body.keyExpiresOn;

        if (!keyName || !keyDescription) {
            setErrorResponse(res, ApiResponseCodes.InputMissing);
            return;
        }

        const apiAuthKey = entityHelper.generateGuid("apikey");
        
        const alreadyInDb = await sdkAuthService.getSdkAuth({ key: apiAuthKey });

        if (!alreadyInDb) {
            const apiKey = await entityHelper.generateGuid("sk");
            
            await sdkAuthService.addSdkAuth({
                name: keyName,
                description: keyDescription,
                createdOn: dateHelper.utcNow().toJSDate(),
                expiresOn: keyExpiresOn ? new Date(keyExpiresOn) : dateHelper.utcNow().plus({month: 1}).toJSDate(),
                updatedOn: dateHelper.utcNow().toJSDate(),
                key: apiAuthKey,
                apiKey: apiKey
            });

            setSuccessResponse(res, ApiResponseCodes.Success, {apikey: apiKey}, req);
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

        const alreadyInDb = await sdkAuthService.getSdkAuth({ key: apiAuthKey });

        if (alreadyInDb) {
            await sdkAuthService.deleteSdkAuth(alreadyInDb);
            setSuccessResponse(res, ApiResponseCodes.Success, null, req);
        } else {
            setErrorResponse(res, ApiResponseCodes.SdkAuthKeyNotFound);
        }
    });

    return apiAuthRoutes;
};
