import { UserModel, keys, dateHelper } from "@switchfeat/core";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import * as userService from "../../services/usersService";

// https://devpress.csdn.net/mongodb/62f214b07e668234661849d8.html

var env = process.env.NODE_ENV;

export const googleStrategy = () : GoogleStrategy => {
  return new GoogleStrategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: (env !== "dev" ? keys.CLIENT_HOME_PAGE_URL : "") + "/auth/google/redirect",
    scope: ['profile', 'email'],
    state: true
  },
    async (accessToken: any, tokenSecret: any, profile: any, done: any) => {

      // find current user
      const currentUser = await userService.getUser({ email: profile._json.email });

      if (!profile._json.email_verified) {
        return null;
      }

      // create new user if the database doesn't have this user
      if (!currentUser) {

        const newUser = {
          name: profile._json.name,
          imageUrl: profile._json.picture,
          createdOn: dateHelper.utcNow().toJSDate(),
          updatedOn: dateHelper.utcNow().toJSDate(),
          email: profile._json.email,
          isBlocked: false
        } as UserModel;

        if (await userService.addUser(newUser)) {

          console.log(`new user ${newUser.name} created.`);

          // send email to me and the user
          // await emailHelper.sendEmailInternalForNewUser(newUser);
          // await emailHelper.sendWelcomeEmail(newUser.email, newUser.name);

          done(null, newUser);
        }

      } else {
        console.log(`user ${currentUser.name} already registered.`);
        currentUser.imageUrl = profile._json.picture;
        await userService.updateUser(currentUser);

        done(null, currentUser);
      }
    }

  );
}