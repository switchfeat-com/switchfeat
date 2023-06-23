import dotenv from 'dotenv';

dotenv.config();

const MONGODB = {
    MONGODB_URI: (process.env.DbUri as string)
};


export const keys = {
    ...MONGODB
};