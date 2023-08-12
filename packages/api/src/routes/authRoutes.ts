import { NextFunction, Router } from "express";
import passport from "passport";
import { ApiResponseCodes, keys } from "@switchfeat/core";
import { Request, Response } from "express";
import { setErrorResponse } from "../helpers/responseHelper";

export const authRoutes = Router();

/**
 * OAuth authentication routes. (Sign in)
 */
authRoutes.get("/auth/google", passport.authenticate("google"));
authRoutes.get(
    "/auth/google/redirect",
    passport.authenticate("google", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login/failed",
    }),
);

// when login is successful, retrieve user info
authRoutes.get("/auth/is-auth", (req: Request, res: Response) => {
    if (!keys.AUTH_PROVIDER) {
        res.json({
            success: true,
            message: "user always authenticated",
            user: {},
            cookies: req.cookies,
        });
    } else {
        if (req.isAuthenticated()) {
            res.json({
                success: true,
                message: "user has successfully authenticated",
                user: req.user,
                cookies: req.cookies,
            });
        } else {
            setErrorResponse(res, ApiResponseCodes.UserAuthFailed);
        }
    }
});

// when login failed, send failed msg
authRoutes.get("/auth/login/failed", (req: Request, res: Response) => {
    res.redirect(keys.CLIENT_HOME_PAGE_URL + "/unauthorized");
});

// When logout, redirect to client
authRoutes.get(
    "/auth/logout",
    (req: Request, res: Response, next: NextFunction) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect(keys.CLIENT_HOME_PAGE_URL);
        });
    },
);
