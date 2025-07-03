import { Router } from 'express';
import { signin, signup, signout } from '../controllers/auth.controller.js';

const authrouter = Router();

authrouter.post("/sign-up", signin);
authrouter.post("/sign-in", signup);
authrouter.post("/sign-out", signout);

export default authrouter;
