import { Router } from "express"

const userrouter = Router();

userrouter.get("/", (req, res) => res.send({ title: "get all users" }));

userrouter.get('/:id', (req, res) => res.send({ title: "get user details" }));

userrouter.post("/", (req, res) => res.send({ title: "create new user" }));

userrouter.put("/:id", (req, res) => res.send({ title: "Update user deatails" }));

userrouter.delete("/:id", (req, res) => res.send({ title: "Delete user details" }));

export default userrouter;
