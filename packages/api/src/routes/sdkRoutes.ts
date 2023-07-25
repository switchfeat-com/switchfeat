import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';
import * as flagsService from "../services/flagsService";
import * as segmentsService from "../services/segmentsService";
import * as auth from "../managers/auth/passportAuth";
import { SdkResponseCodes, dbManager } from "@switchfeat/core";
import * as sdkService from "../services/sdkService";

export const sdkRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>): Router => {

    flagsService.setDataStoreManager(storeManager);
    segmentsService.setDataStoreManager(storeManager);
    const upload = multer();
    const sdkRoutes = Router();

    sdkRoutes.get("/api/sdk/flags", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try {
            const flags = await flagsService.getFlags("");
            res.json({
                user: req.user,
                flags: flags
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: SdkResponseCodes.GenericError
            });
        }
    });

    sdkRoutes.post("/api/sdk/flag", upload.any(), auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try {
            const flagKey = req.body.flagKey;
            const flagContext = req.body.flagContext;
            const correlationId = req.body.correlationId;

            const flag = await flagsService.getFlag({key: flagKey});

            if (!flag) {
                res.json({
                    user: req.user,
                    error: SdkResponseCodes.FlagNotFound
                });

                return;
            }
            
           const resp = await sdkService.evaluateFlag(flag, flagContext, correlationId); 

            res.json({
                user: req.user,
                data: resp
            });

        } catch (error) {
            res.json({
                user: req.user,
                error: SdkResponseCodes.GenericError
            });
        }
    });

    sdkRoutes.get("/api/sdk/flags/:flagKey/rules", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try { 
            const flagKey = req.params.flagKey as string;
            const rules = await flagsService.getRulesByFlag(flagKey);
            res.json({
                user: req.user,
                rules: rules
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: SdkResponseCodes.GenericError
            });
        }
    });    

    sdkRoutes.get("/api/sdk/segments", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try { 
            const segments = await segmentsService.getSegments("");
            res.json({
                user: req.user,
                segments: segments
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: SdkResponseCodes.GenericError
            });
        }
    });

    sdkRoutes.get("/api/sdk/segments/:segmentKey/conditions", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try { 
            const segmentKey = req.params.segmentKey as string;
            const conditions = await segmentsService.getConditionsBySegment(segmentKey);
            res.json({
                user: req.user,
                conditions: conditions
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: SdkResponseCodes.GenericError
            });
        }
    });    
    return sdkRoutes;
};
