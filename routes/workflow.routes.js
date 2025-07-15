import { Router } from "express";
import { sendreminders } from "../controllers/workflow.controller.js";

const workflowrouter = Router();
workflowrouter.post('/subscription/reminder', sendreminders);

export default workflowrouter;