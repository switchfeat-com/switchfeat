import Router from "express";

const router = Router.Router();
import multer from 'multer';
import { getFlags } from "../services/flagsService";

const upload = multer();


router.get("/", async (req, res) => {
    if (req.user) {

        try {

            const flags = getFlags(req.user.id);

            if (req.user === null) {
                res.status(401).json({
                    success: false,
                    message: "user request invalid"
                });

                return;
            }



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
                message: "unable to retrieve posts"
            });
        }
    }

});

export default router;