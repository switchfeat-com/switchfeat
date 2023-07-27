import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';
import * as flagsService from "../services/flagsService";
import * as segmentsService from "../services/segmentsService";
import * as auth from "../managers/auth/passportAuth";
import { ApiResponseCodes, dbManager } from "@switchfeat/core";
import * as sdkService from "../services/sdkService";
import { setErrorResponse, setSuccessResponse } from "../helpers/responseHelper";

export const sdkRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>): Router => {

    flagsService.setDataStoreManager(storeManager);
    segmentsService.setDataStoreManager(storeManager);
    const upload = multer();
    const sdkRoutes = Router();

    sdkRoutes.get("/api/sdk/flags", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try {
            const flags = await flagsService.getFlags();
            setSuccessResponse(res, ApiResponseCodes.Success, flags);
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    sdkRoutes.get("/api/sdk/flags/:flagKey", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try {
            const flagKey = req.params.flagKey;
            const flag = await flagsService.getFlag({key: flagKey});

            if (!flag) {
                setErrorResponse(res, ApiResponseCodes.FlagNotFound);
                return;
            }
            
            setSuccessResponse(res, ApiResponseCodes.Success, flag);
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    sdkRoutes.post("/api/sdk/flags/:flagKey/evaluate", upload.any(), auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try {
            const flagKey = req.params.flagKey;
            const flagContext = req.body.context;
            const correlationId = req.body.correlationId;

            const flag = await flagsService.getFlag({key: flagKey});

            if (!flag || !flagContext) {
                setErrorResponse(res, ApiResponseCodes.FlagNotFound);
                return;
            }
            
           const resp = await sdkService.evaluateFlag(flag, flagContext, correlationId); 
           setSuccessResponse(res, ApiResponseCodes.Success, resp);

        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    sdkRoutes.get("/api/sdk/flags/:flagKey/rules", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try { 
            const flagKey = req.params.flagKey as string;
            const rules = await flagsService.getRulesByFlag(flagKey);
            setSuccessResponse(res, ApiResponseCodes.Success, rules, req);
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });    

    sdkRoutes.get("/api/sdk/segments", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try { 
            const segments = await segmentsService.getSegments();
            setSuccessResponse(res, ApiResponseCodes.Success, segments);
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    sdkRoutes.get("/api/sdk/segments/:segmentKey/conditions", auth.isSdkAuthenticated, async (req: Request, res: Response) => {
        try { 
            const segmentKey = req.params.segmentKey as string;
            const conditions = await segmentsService.getConditionsBySegment(segmentKey);
            setSuccessResponse(res, ApiResponseCodes.Success, conditions);
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });    
    return sdkRoutes;
};
