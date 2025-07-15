import { Router } from "express";
import { getuser, getuserbyid } from "../controllers/user.controller.js";
import authorize from '../middlewares/auth.middleware.js';

const userrouter = Router();

userrouter.get("/", getuser);

userrouter.get('/:id', authorize, getuserbyid);

userrouter.post("/", (req, res) => res.send({ title: "create new user" }));

userrouter.put("/:id", (req, res) => res.send({ title: "Update user deatails" }));

userrouter.delete("/:id", (req, res) => res.send({ title: "Delete user details" }));

export default userrouter;
