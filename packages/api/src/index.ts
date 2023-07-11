import express, { Express } from 'express';
import session from "express-session";
import passport from "passport";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { keys, dbManager } from "@switchfeat/core";
import { flagRoutes } from "./routes/flagsRoutes";
import { authRoutes } from './routes/authRoutes';
import dotenv from "dotenv";
import * as passportAuth from "./managers/auth/passportAuth"; 
import { getDataStoreManager } from './managers/auth/dataStoreManager';

dotenv.config();

const env = process.env.NODE_ENV;

// connect to mongodb
const dataStoreManager: dbManager.DataStoreManager = getDataStoreManager();

dataStoreManager.connectDb();

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

// set up cors to allow us to accept requests from our client

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
app.use(flagRoutes);


if (env !== "dev") {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../ui/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${keys.API_URL} , env: ${env}`);
});
