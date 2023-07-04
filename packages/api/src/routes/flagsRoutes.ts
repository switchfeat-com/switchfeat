import { Router } from "express";
import { Request, Response } from "express";
import multer from 'multer';

export const flagRoutes = Router();
import * as flagsService from "../services/flagsService";
import * as auth from "../managers/auth/passportAuth" ;
import { dateHelper } from "@switchfeat/core";

const upload = multer();


flagRoutes.get("/api/flags/",auth.isAuthenticated, async (req : Request, res : Response) => {

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

flagRoutes.post("/api/flags/", upload.any(), auth.isAuthenticated, async (req : Request, res : Response) => {

    console.log("received: " + JSON.stringify(req.body));

    let flagName = req.body.flagName;
    let flagDescription = req.body.flagDescription;
    let flagStatus = req.body.flagStatus;

    if (!flagName) {
        res.status(400).json({
            success: false,
            code: "error_flag_name_missing",
            message: "Could not save flag. Flag name is missing."
        });
        return;
    }


    let alreadyInDb = await flagsService.getFlag({ name: flagName });

    if (!alreadyInDb) {
        await flagsService.addFlag({
            name: flagName,
            description: flagDescription,
            createdOn: dateHelper.utcNow().toJSDate(),
            status: !!flagStatus,
            updatedOn: dateHelper.utcNow().toJSDate()
        });

        res.status(200).json({
            success: true,
        });
    } else {
        // set error code
        res.status(400).json({
            success: false,
            code: "error_project_alreadysaved",
            message: "Could not save project. Project already exists."
        });
    }
});