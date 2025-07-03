//import { config } from 'dotenv';

//config({
//    path: `.env.${process.env.NODE_ENV || 'development'}.local`
//});

//export const { PORT , NODE_ENV } = process.env;

// backend/config.js

//*global process*/
/*eslint no-undef: "error"*/

import { config } from 'dotenv';

config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});

export const { PORT,
    NODE_ENV,
    MONGODB_URI,
    JWT_SECERT,
    JWT_EXPIRES_IN
} = process.env;
