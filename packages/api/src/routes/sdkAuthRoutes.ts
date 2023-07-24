import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';
import * as sdkAuthService from "../services/sdkAuthService";
import * as auth from "../managers/auth/passportAuth";
import { dateHelper, dbManager, entityHelper } from "@switchfeat/core";
import { nanoid } from "nanoid/async";

export const sdkAuthRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>) : Router  => {

    sdkAuthService.setDataStoreManager(storeManager);

    const upload = multer();
    const apiAuthRoutes = Router();
    apiAuthRoutes.get("/api/sdkauth/", auth.isAuthenticated, async (req: Request, res: Response) => {

        try {

            const sdkAuths = await sdkAuthService.getsdkAuths("");

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
                errorCode: "error_apiauth_nolist"
            });
        }
    });

    apiAuthRoutes.post("/api/sdkauth/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received authkeys add: " + JSON.stringify(req.body));

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
        
        const alreadyInDb = await sdkAuthService.getApiAuth({ key: apiAuthKey });

        if (!alreadyInDb) {
            const apiKey = await nanoid();
            
            await sdkAuthService.addApiAuth({
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
                errorCode: "error_apiauth_alreadysaved"
            });
        }
    }); 
   

    apiAuthRoutes.delete("/api/sdkauth/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received apiAuth delete: " + JSON.stringify(req.body));

        const apiAuthKey = req.body.apiAuthKey;

        if (!apiAuthKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await sdkAuthService.getApiAuth({ key: apiAuthKey });

        if (alreadyInDb) {
            await sdkAuthService.deleteApiAuth(alreadyInDb);

            res.json({
                success: true,
                errorCode: ""
            });
        } else {
            res.json({
                success: false,
                errorCode: "error_apiauth_notfound"
            });
        }
    });

    return apiAuthRoutes;
};
