import { Router } from "express";
import { Request, Response } from "express";

export const flagRoutes = Router();
import { getFlags } from "../services/flagsService";
import * as auth from "../managers/auth/passportAuth" 


flagRoutes.get("/api/flags",auth.isAuthenticated, async (req : Request, res : Response) => {

    try {

        const flags = await getFlags("");

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