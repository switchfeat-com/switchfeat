import { Router } from "express";

export const flagRoutes = Router();
import { getFlags } from "../services/flagsService";


flagRoutes.get("/api/flags", async (req, res) => {

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