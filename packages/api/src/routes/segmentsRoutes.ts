import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';

import * as segmentsService from "../services/segmentsService";
import * as auth from "../managers/auth/passportAuth";
import { dateHelper, dbManager, entityHelper, SegmentMatching } from "@switchfeat/core";

export const segmentsRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>): Router => {

    segmentsService.setDataStoreManager(storeManager);

    const upload = multer();
    const flagRoutes = Router();
    flagRoutes.get("/api/segments/", auth.isAuthenticated, async (req: Request, res: Response) => {

        try { 

            const segments = await segmentsService.getSegments("");

            res.json({
                success: true,
                user: req.user,
                cookies: req.cookies,
                segments: segments
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "unable to retrieve conditions"
            });
        }
    });

    flagRoutes.post("/api/segments/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received segments add: " + JSON.stringify(req.body));

        const segmentName = req.body.segmentName;
        const segmentDescription = req.body.segmentDescription;
        const matching = req.body.segmentMatching;
        const conditions = req.body.segmentConditions;

        if (!segmentName) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const segmentkey = entityHelper.generateGuid("segment");

        await segmentsService.addSegment({
            name: segmentName,
            key: segmentkey,
            description: segmentDescription,
            createdOn: dateHelper.utcNow().toJSDate(),
            updatedOn: dateHelper.utcNow().toJSDate(),
            matching: matching as SegmentMatching,
            conditions: JSON.parse(conditions)
        });

        res.json({
            success: true,
            errorCode: ""
        });
    });

    flagRoutes.put("/api/segments/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received segments update: " + JSON.stringify(req.body));

         const segmentKey = req.body.segmentKey;
         const segmentName = req.body.segmentName;
         const segmentDescription = req.body.segmentDescription;
         const matching = req.body.segmentMatching;
         const conditions = req.body.segmentConditions;

        if (!segmentKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await segmentsService.getSegment({ key: segmentKey });

        if (alreadyInDb) {

            alreadyInDb.updatedOn = dateHelper.utcNow().toJSDate();
            alreadyInDb.description = segmentDescription ? segmentDescription : alreadyInDb.description;
            alreadyInDb.name = segmentName ? segmentName : alreadyInDb.name;

            alreadyInDb.matching = matching;
            alreadyInDb.conditions = JSON.parse(conditions);

            await segmentsService.updateSegment(alreadyInDb);

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

    flagRoutes.delete("/api/segments/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received segments delete: " + JSON.stringify(req.body));

        const segmentKey = req.body.segmentKey;

        if (!segmentKey) {
            res.status(401).json({
                success: false,
                errorCode: "error_input"
            });
            return;
        }

        const alreadyInDb = await segmentsService.getSegment({ key: segmentKey });

        if (alreadyInDb) {
            await segmentsService.deleteSegment(alreadyInDb);

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
