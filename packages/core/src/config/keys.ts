import dotenv from 'dotenv';

dotenv.config();

const CLIENT_HOME_PAGE_URL =  "http://localhost:3000";
const API_URL =  "http://localhost:4000";

const AUTH_PROVIDER = (process.env.AuthProvider as string);

const MONGODB = {
    MONGODB_URI: (process.env.DbUri as string)
};

const GOOGLE_AUTH = {
    GOOGLE_CLIENT_ID: (process.env.GoogleClientId as string),
    GOOGLE_CLIENT_SECRET: (process.env.GoogleClientSecret as string)
};

export const keys = {
    ...MONGODB,
    ...GOOGLE_AUTH,
    CLIENT_HOME_PAGE_URL,
    API_URL,
    AUTH_PROVIDER
};