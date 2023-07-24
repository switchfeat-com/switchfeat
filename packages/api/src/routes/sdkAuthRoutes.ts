import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';
import * as sdkAuthService from "../services/sdkAuthService";
import * as auth from "../managers/auth/passportAuth";
import { dateHelper, dbManager, entityHelper } from "@switchfeat/core";

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
            console.log(error);
            res.status(500).json({
                success: false,
                errorCode: "error_sdk_auth_nolist"
            });
        }
    });

    apiAuthRoutes.post("/api/sdk/auth/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received sdkAuth add: " + JSON.stringify(req.body));

        const keyName = req.body.keyName;
        const keyDescription = req.body.keyDescription;
        const keyExpiresOn = req.body.keyExpiresOn;

        if (!keyName || !keyDescription) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
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
                expiresOn: new Date(keyExpiresOn),
                updatedOn: dateHelper.utcNow().toJSDate(),
                key: apiAuthKey,
                apiKey: apiKey
            });

            res.json({
                success: true,
                errorCode: "",
                apiKey: apiKey
            });
        } else {
            res.json({
                success: false,
                errorCode: "error_sdk_auth_alreadysaved"
            });
        }
    }); 
   

    apiAuthRoutes.delete("/api/sdk/auth/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received sdkAuth delete: " + JSON.stringify(req.body));

        const apiAuthKey = req.body.sdkAuthKey;

        if (!apiAuthKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await sdkAuthService.getSdkAuth({ key: apiAuthKey });

        if (alreadyInDb) {
            await sdkAuthService.deleteSdkAuth(alreadyInDb);

            res.json({
                success: true,
                errorCode: ""
            });
        } else {
            res.json({
                success: false,
                errorCode: "error_sdk_auth_notfound"
            });
        }
    });

    return apiAuthRoutes;
};
