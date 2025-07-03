import { Router } from "express";

const subscriptionrouter = Router();

subscriptionrouter.get('/', (req, res) => res.send({ title: "Get all subscriptions" }));

subscriptionrouter.get('/:id', (req, res) => res.send({ title: "Get subscription details" }));

subscriptionrouter.post('/', (req, res) => res.send({ title: "Creat subscription" }));

subscriptionrouter.put('/:id', (req, res) => res.send({ title: "Update subscription" }));

subscriptionrouter.delete('/:id', (req, res) => res.send({ title: "Delete subscription" }));

subscriptionrouter.get('/user/:id', (req, res) => res.send({ title: "Get all users subscriptions" }));

subscriptionrouter.get('/:id/cancel', (req, res) => res.send({ title: "Cancel subscriptions" }));

subscriptionrouter.get('/upcoming-renewals', (req, res) => res.send({ title: "Get upcoming renewals" }));


export default subscriptionrouter;