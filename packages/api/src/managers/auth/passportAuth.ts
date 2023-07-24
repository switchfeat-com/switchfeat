import passport from "passport";
import { Request, Response, NextFunction, Express } from "express";
import * as userService from "../../services/usersService";
import * as sdkAuthService from "../../services/sdkAuthService";
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

/* 
** - Get the apikey from the sdk request
** - Lookup of the key in db
** - Ensure it is not expired
*/
export const isSdkAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

	const apiKey = req.headers["sf-api-key"] as string;
	if (!apiKey) {
		res.status(401).json({
			error: "api_key_missing",
			errodDecription: "Add the 'sf-api-key' header with your api key to the request"
		});

		return;
	}
	const foundInDb = await sdkAuthService.getSdkAuth({ apiKey: apiKey });

	const isValid = foundInDb !== null && foundInDb.expiresOn > new Date();

	if (!keys.AUTH_PROVIDER && isValid) {
		return next();
	}

	res.status(401).json({
		error: "api_key_invalid"
	});
	
	return;
};


