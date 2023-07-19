import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';
import * as flagsService from "../services/flagsService";
import * as auth from "../managers/auth/passportAuth";
import { dbManager } from "@switchfeat/core";
import * as sdkService from "../services/sdkService";

export const sdkRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>): Router => {

    flagsService.setDataStoreManager(storeManager);

    const upload = multer();
    const sdkRoutes = Router();

    sdkRoutes.get("/api/sdk/flags", auth.isAuthenticated, async (req: Request, res: Response) => {
        try {
            const flags = await flagsService.getFlags("");

            res.json({
                success: true,
                user: req.user,
                flags: flags
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "unable to retrieve flags"
            });
        }
    });

    sdkRoutes.post("/api/sdk/flag", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {
        try {

            const flagKey = req.body.flagKey;
            const flagContext = req.body.flagContext;

            const flag = await flagsService.getFlag({key: flagKey});

            if (!flag) {
                res.status(404).json({
                    success: false,
                    user: req.user,
                    error: "missing_flagkey"
                });

                return;
            }
            
           const resp = await sdkService.evaluateFlag(flag, flagContext);


            res.json({
                success: true,
                user: req.user,
                data: resp
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "unable to retrieve flags"
            });
        }
    });


    return sdkRoutes;
};
