import passport from "passport";
import { Request, Response, NextFunction, Express } from "express";
import * as userService from "../../services/usersService";
import { googleStrategy } from "./googleAuth";
import { keys } from "@switchfeat/core";


export const initialise = (app: Express) => {

  app.use(passport.initialize());

  // serialize the user.id to save in the cookie session
  // so the browser will remember the user when login
  passport.serializeUser((_req, user, done) => {
    done(null, user);
  });

  // deserialize the cookieUserId to user in the database
  passport.deserializeUser(async (id: string, done) => {
    const currentUser = await userService.getUser({ userId: id });
    done(currentUser === null ? "user not found." : null, { user: currentUser });
  });

  if (keys.AUTH_PROVIDER === "google") {
    console.log(" -> Google auth active");
    passport.use(googleStrategy());
  }
};




export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!keys.AUTH_PROVIDER || req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};


