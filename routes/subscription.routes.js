import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createsubscription, getallsubscriptions } from "../controllers/subscription.contoller.js";


const subscriptionrouter = Router();

subscriptionrouter.get('/', (req, res) => res.send({ title: "Get all subscriptions" }));

subscriptionrouter.get('/:id', (req, res) => res.send({ title: "Get subscription details" }));

subscriptionrouter.post('/', authorize, createsubscription);

subscriptionrouter.put('/:id', (req, res) => res.send({ title: "Update subscription" }));

subscriptionrouter.delete('/:id', (req, res) => res.send({ title: "Delete subscription" }));

subscriptionrouter.get('/user/:id', authorize, getallsubscriptions);

subscriptionrouter.get('/:id/cancel', (req, res) => res.send({ title: "Cancel subscriptions" }));

subscriptionrouter.get('/upcoming-renewals', (req, res) => res.send({ title: "Get upcoming renewals" }));


export default subscriptionrouter;