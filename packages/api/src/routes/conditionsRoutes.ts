import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';

import * as conditionService from "../services/conditionsService";
import * as auth from "../managers/auth/passportAuth";
import { dateHelper, dbManager, entityHelper } from "@switchfeat/core";

export const conditionsRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>): Router => {

    conditionService.setDataStoreManager(storeManager);

    const upload = multer();
    const flagRoutes = Router();
    flagRoutes.get("/api/conditions/", auth.isAuthenticated, async (req: Request, res: Response) => {

        try {

            const segmentKey = req.query.segmentKey;

            if (!segmentKey) {
                res.status(401).json({
                    success: false,
                    errorCode: "error_input"
                });
                return;
            }

            const conditions = await conditionService.getConditions(segmentKey as string);

            res.json({
                success: true,
                user: req.user,
                cookies: req.cookies,
                conditions: conditions
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "unable to retrieve conditions"
            });
        }
    });

    flagRoutes.post("/api/conditions/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received condition add: " + JSON.stringify(req.body));

        const conditionName = req.body.flagName;
        const conditionDescription = req.body.flagDescription;
        const conditionType = req.body.conditionType;
        const conditionContext = req.body.conditionContext;
        const conditionOpearator = req.body.conditionOpearator;
        const conditionSegmentKey = req.body.conditionSegmentKey;
        const conditionValue = req.body.conditionValue;

        if (!conditionSegmentKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const conditionKey = entityHelper.generateGuid("condition");

        await conditionService.addCondition({
            name: conditionName,
            key: conditionKey,
            description: conditionDescription,
            createdOn: dateHelper.utcNow().toJSDate(),
            updatedOn: dateHelper.utcNow().toJSDate(),
            conditionType: conditionType,
            context: conditionContext,
            operator: conditionOpearator,
            segmentKey: conditionSegmentKey,
            value: conditionValue
        });

        res.json({
            success: true,
            errorCode: ""
        });
    });

    flagRoutes.put("/api/conditions/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received conditions update: " + JSON.stringify(req.body));

        const conditionName = req.body.conditionName;
        const conditionKey = req.body.conditionKey;
        const conditionDescription = req.body.conditionDescription;
        const conditionType = req.body.conditionType;
        const conditionContext = req.body.conditionContext;
        const conditionOpearator = req.body.conditionOpearator;
        const conditionSegmentKey = req.body.conditionSegmentKey;
        const conditionValue = req.body.conditionValue;

        if (!conditionKey || !conditionSegmentKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await conditionService.getCondition({ key: conditionKey });

        if (alreadyInDb) {

            alreadyInDb.updatedOn = dateHelper.utcNow().toJSDate();
            alreadyInDb.description = conditionDescription ? conditionDescription : alreadyInDb.description;
            alreadyInDb.name = conditionName ? conditionName : alreadyInDb.name;

            alreadyInDb.conditionType = conditionType;
            alreadyInDb.context = conditionContext;
            alreadyInDb.operator = conditionOpearator;
            alreadyInDb.segmentKey = conditionSegmentKey;
            alreadyInDb.value = conditionValue;
            await conditionService.updateCondition(alreadyInDb);

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

    flagRoutes.delete("/api/conditions/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received condition delete: " + JSON.stringify(req.body));

        const conditionKey = req.body.conditionKey;

        if (!conditionKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await conditionService.getCondition({ key: conditionKey });

        if (alreadyInDb) {
            await conditionService.deleteCondition(alreadyInDb);

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
