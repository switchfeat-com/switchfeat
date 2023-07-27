import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';

import * as segmentsService from "../services/segmentsService";
import * as auth from "../managers/auth/passportAuth";
import { dateHelper, dbManager, entityHelper, ApiResponseCodes, SegmentMatching } from "@switchfeat/core";
import { setErrorResponse, setSuccessResponse } from "../helpers/responseHelper";

export const segmentsRoutesWrapper = (storeManager: Promise<dbManager.DataStoreManager>): Router => {

    segmentsService.setDataStoreManager(storeManager);

    const upload = multer();
    const flagRoutes = Router();
    flagRoutes.get("/api/segments/", auth.isAuthenticated, async (req: Request, res: Response) => {
        try { 
            const segments = await segmentsService.getSegments("");
            setSuccessResponse(res, ApiResponseCodes.Success, segments, req);
        } catch (error) {
            setErrorResponse(res, ApiResponseCodes.GenericError);
        }
    });

    flagRoutes.post("/api/segments/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received segments add: " + JSON.stringify(req.body));

        const segmentName = req.body.segmentName;
        const segmentDescription = req.body.segmentDescription;
        const matching = req.body.segmentMatching;
        const conditions = req.body.segmentConditions;

        if (!segmentName) {
            setErrorResponse(res, ApiResponseCodes.InputMissing);
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

        setSuccessResponse(res, ApiResponseCodes.Success, null, req);
    });

    flagRoutes.put("/api/segments/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received segments update: " + JSON.stringify(req.body));

         const segmentKey = req.body.segmentKey;
         const segmentName = req.body.segmentName;
         const segmentDescription = req.body.segmentDescription;
         const matching = req.body.segmentMatching;
         const conditions = req.body.segmentConditions;

        if (!segmentKey) {
            setErrorResponse(res, ApiResponseCodes.InputMissing);
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

            setSuccessResponse(res, ApiResponseCodes.Success, null, req);
        } else {
            setErrorResponse(res, ApiResponseCodes.SegmentNotFound);
        }
    });

    flagRoutes.delete("/api/segments/", upload.any(), auth.isAuthenticated, async (req: Request, res: Response) => {

        console.log("received segments delete: " + JSON.stringify(req.body));

        const segmentKey = req.body.segmentKey;

        if (!segmentKey) {
            setErrorResponse(res, ApiResponseCodes.InputMissing);
            return;
        }

        const alreadyInDb = await segmentsService.getSegment({ key: segmentKey });

        if (alreadyInDb) {
            await segmentsService.deleteSegment(alreadyInDb);

            setSuccessResponse(res, ApiResponseCodes.Success, null, req);
        } else {
            setErrorResponse(res, ApiResponseCodes.SegmentNotFound);
        }
    });

    return flagRoutes;
};
