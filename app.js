import express from 'express';

import { PORT } from './config/env.js';

import userrouter from './routes/user.routes.js';
import authrouter from './routes/auth.routes.js';
import subscriptionrouter from './routes/subscription.routes.js';
import connect2database from './database/mongodb.js';
import errormiddleware from './middlewares/error.middleware.js';
import  cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authrouter);
app.use('/api/v1/users', userrouter);
app.use('/api/v1/subscriptions', subscriptionrouter);

app.use(errormiddleware);


app.get("/", (req, res) => {
    res.send("Welcome to subscription tracker API");
});

app.listen(PORT, async () => {
    console.log(`server is running on http://localhost:${PORT}`);

     await connect2database();
});

export default app;