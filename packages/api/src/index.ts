import express, { Express } from 'express';
import session from "express-session";
import passport from "passport";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { keys, dbManager } from "@switchfeat/core";
import { flagRoutesWrapper } from "./routes/flagsRoutes";
import { authRoutes } from './routes/authRoutes';
import dotenv from "dotenv";
import * as passportAuth from "./managers/auth/passportAuth"; 
import { getDataStoreManager } from './managers/auth/dataStoreManager';
import { segmentsRoutesWrapper } from './routes/segmentsRoutes';
import { sdkRoutesWrapper } from './routes/sdkRoutes';

dotenv.config();
const env = process.env.NODE_ENV;

// connect to datastore
const dataStoreManagerPromise: Promise<dbManager.DataStoreManager> = getDataStoreManager();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cookieParser());

// used for post requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: keys.SESSION_SECRET,
}));

passportAuth.initialise(app);
app.use(passport.session());

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  }));

if (env !== "dev") {
  app.use(express.static(path.resolve(__dirname, '../../ui/build')));
}

app.use(authRoutes);
app.use(flagRoutesWrapper(dataStoreManagerPromise));
app.use(segmentsRoutesWrapper(dataStoreManagerPromise));
app.use(sdkRoutesWrapper(dataStoreManagerPromise));

if (env !== "dev") {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../ui/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${keys.API_URL} , env: ${env}`);
});
