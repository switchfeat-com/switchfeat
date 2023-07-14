import express, { Express } from 'express';
import session from "express-session";
import passport from "passport";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { keys, dbManager } from "@switchfeat/core";
import { flagRoutesWrapper } from "./routes/flagsRoutes";
import { conditionsRoutesWrapper } from "./routes/conditionsRoutes";
import { authRoutes } from './routes/authRoutes';
import dotenv from "dotenv";
import * as passportAuth from "./managers/auth/passportAuth"; 
import { getDataStoreManager } from './managers/auth/dataStoreManager';
import { segmentsRoutesWrapper } from './routes/segmentsRoutes';

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
  secret: "$%£$£DDikdjflieas93mdjk.sldcpes",
}));

passportAuth.initialise(app);
app.use(passport.session());

app.use(
  cors({
    origin: keys.CLIENT_HOME_PAGE_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  }));

if (env !== "dev") {
  app.use(express.static(path.resolve(__dirname, '../../ui/build')));
}

app.use(authRoutes);
app.use(flagRoutesWrapper(dataStoreManagerPromise));
app.use(conditionsRoutesWrapper(dataStoreManagerPromise));
app.use(segmentsRoutesWrapper(dataStoreManagerPromise));

if (env !== "dev") {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../ui/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${keys.API_URL} , env: ${env}`);
});
