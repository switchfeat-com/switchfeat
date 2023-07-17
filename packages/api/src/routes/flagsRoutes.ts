import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';

import * as flagsService from "../services/flagsService";
import * as auth from "../managers/auth/passportAuth";
import { dateHelper, dbManager, entityHelper } from "@switchfeat/core";

export const flagRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>) : Router  => {

    flagsService.setDataStoreManager(storeManager);

    const upload = multer();
    const flagRoutes = Router();
    flagRoutes.get("/api/flags/", auth.isAuthenticated, async (req: Request, res: Response) => {

        try {

            const flags = await flagsService.getFlags("");

            res.json({
                success: true,
                user: req.user,
                cookies: req.cookies,
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

    flagRoutes.post("/api/flags/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received flag add: " + JSON.stringify(req.body));

        const flagName = req.body.flagName;
        const flagDescription = req.body.flagDescription;
        const flagStatus = req.body.flagStatus;

        if (!flagName) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const flagKey = entityHelper.generateKey(flagName);
        const alreadyInDb = await flagsService.getFlag({ key: flagKey });

        if (!alreadyInDb) {
            await flagsService.addFlag({
                name: flagName,
                description: flagDescription,
                createdOn: dateHelper.utcNow().toJSDate(),
                status: (flagStatus === "true"),
                updatedOn: dateHelper.utcNow().toJSDate(),
                key: flagKey
            });

            res.json({
                success: true,
                errorCode: ""
            });
        } else {
            res.json({
                success: false,
                errorCode: "error_flag_alreadysaved"
            });
        }
    });

    flagRoutes.put("/api/flags/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received flag update: " + JSON.stringify(req.body));

        const flagKey = req.body.flagKey;
        const flagName = req.body.flagName;
        const flagDescription = req.body.flagDescription;
        const flagStatus = req.body.flagStatus;

        if (!flagKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await flagsService.getFlag({ key: flagKey });

        if (alreadyInDb) {
            alreadyInDb.status = (flagStatus === "true");
            alreadyInDb.updatedOn = dateHelper.utcNow().toJSDate();
            alreadyInDb.description = flagDescription ? flagDescription : alreadyInDb.description;
            alreadyInDb.name = flagName ? flagName : alreadyInDb.name;
            await flagsService.updateFlag(alreadyInDb);

            res.json({
                success: true,
                errorCode: ""
            });
        } else {
            res.json({
                success: false,
                errorCode: "error_flag_notfound"
            });
        }
    });

    flagRoutes.delete("/api/flags/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received flag delete: " + JSON.stringify(req.body));

        const flagKey = req.body.flagKey;

        if (!flagKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await flagsService.getFlag({ key: flagKey });

        if (alreadyInDb) {
            await flagsService.deleteFlag(alreadyInDb);

            res.json({
                success: true,
                errorCode: ""
            });
        } else {
            res.json({
                success: false,
                errorCode: "error_flag_notfound"
            });
        }
    });

    return flagRoutes;
};
