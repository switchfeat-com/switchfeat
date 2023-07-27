import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';

import * as flagsService from "../services/flagsService";
import * as auth from "../managers/auth/passportAuth";
import { ApiResponseCodes, dateHelper, dbManager, entityHelper } from "@switchfeat/core";
import { setErrorResponse, setSuccessResponse } from "../helpers/responseHelper";

export const flagRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>) : Router  => {

    flagsService.setDataStoreManager(storeManager);

    const upload = multer();
    const flagRoutes = Router();
    flagRoutes.get("/api/flags/", auth.isAuthenticated, async (req: Request, res: Response) => {

        try {

            const flags = await flagsService.getFlags();
            setSuccessResponse(res, ApiResponseCodes.Success, flags, req);
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    flagRoutes.post("/api/flags/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received flag add: " + JSON.stringify(req.body));

        const flagName = req.body.flagName;
        const flagDescription = req.body.flagDescription;
        const flagStatus = req.body.flagStatus;
        const flagRules = req.body.flagRules;

        if (!flagName) {
            setErrorResponse(res, ApiResponseCodes.InputMissing);
            return;
        }

        const flagKey = entityHelper.generateSlug(flagName);
        const alreadyInDb = await flagsService.getFlag({ key: flagKey });

        if (!alreadyInDb) {
            await flagsService.addFlag({
                name: flagName,
                description: flagDescription,
                createdOn: dateHelper.utcNow().toJSDate(),
                status: (flagStatus === "true"),
                updatedOn: dateHelper.utcNow().toJSDate(),
                key: flagKey,
                rules: JSON.parse(flagRules)
            });

            setSuccessResponse(res, ApiResponseCodes.Success, null, req);
        } else {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    flagRoutes.put("/api/flags/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received flag update: " + JSON.stringify(req.body));

        const flagKey = req.body.flagKey;
        const flagName = req.body.flagName;
        const flagDescription = req.body.flagDescription;
        const flagStatus = req.body.flagStatus;
        const flagRules = req.body.flagRules;

        if (!flagKey) {
            setErrorResponse(res, ApiResponseCodes.InputMissing);
            return;
        }

        const alreadyInDb = await flagsService.getFlag({ key: flagKey });

        if (alreadyInDb) {
            alreadyInDb.status = (flagStatus === "true");
            alreadyInDb.updatedOn = dateHelper.utcNow().toJSDate();
            alreadyInDb.description = flagDescription ? flagDescription : alreadyInDb.description;
            alreadyInDb.name = flagName ? flagName : alreadyInDb.name;
            alreadyInDb.rules = flagRules ? JSON.parse(flagRules) : alreadyInDb.rules;
            await flagsService.updateFlag(alreadyInDb);

            setSuccessResponse(res, ApiResponseCodes.Success, null, req);
        } else {
            setErrorResponse(res, ApiResponseCodes.FlagNotFound);
        }
    });

    flagRoutes.delete("/api/flags/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received flag delete: " + JSON.stringify(req.body));

        const flagKey = req.body.flagKey;

        if (!flagKey) {
            setErrorResponse(res, ApiResponseCodes.InputMissing);
            return;
        }

        const alreadyInDb = await flagsService.getFlag({ key: flagKey });

        if (alreadyInDb) {
            await flagsService.deleteFlag(alreadyInDb);
            setSuccessResponse(res, ApiResponseCodes.Success, null, req);
        } else {
            setErrorResponse(res, ApiResponseCodes.FlagNotFound);
        }
    });

    return flagRoutes;
};
