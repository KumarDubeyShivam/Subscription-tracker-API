import { Router } from 'express';
import { signin, signup, signout } from '../controllers/auth.controller.js';

const authrouter = Router();

authrouter.post("/sign-up", signup);
authrouter.post("/sign-in", signin);
authrouter.post("/sign-out", signout);

export default authrouter;
