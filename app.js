import express from 'express';

import { PORT } from './config/env.js';

import userrouter from './routes/user.routes.js';
import authrouter from './routes/auth.routes.js';
import subscriptionrouter from './routes/subscription.routes.js';
import connect2database from './database/mongodb.js';
import errormiddleware from './middlewares/error.middleware.js';
import  cookieParser from 'cookie-parser';
import arcjetmiddleware from './middlewares/arcjet.middleware.js';
import workflowrouter from './routes/workflow.routes.js';
import cors from 'cors';


const app = express();

app.use(cors({
    origin: 'https://subscription-tracker-api-frontend-qpa4sh7b0.vercel.app/', // allow your Next.js frontend
    credentials: true, // if you use cookies or authorization headers
}));

//app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetmiddleware);

app.use('/api/v1/auth', authrouter);
app.use('/api/v1/users', userrouter);
app.use('/api/v1/subscriptions', subscriptionrouter);
app.use('/api/v1/workflows', workflowrouter);

app.use(errormiddleware);


app.get("/", (req, res) => {
    res.send("Welcome to subscription tracker API");
});

app.listen(PORT, async () => {
    console.log(`server is running on http://localhost:${PORT}`);

     await connect2database();
});

export default app;