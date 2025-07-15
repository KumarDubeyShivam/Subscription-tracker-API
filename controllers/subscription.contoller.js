import subscription from "../models/subscription.model.js";
import { workflowclient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";


export const createsubscription = async (req, res, next) => {
    try {
        const subscriptions = await subscription.creat({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowclient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionid : subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });

        res.status(201).json({
            success: true,
            data: { subscriptions, workflowRunId },
        });
    } catch (error) {
        next(error);
    }
}

export const getallsubscriptions = async (req, res, next) => {
    try {
        if (req.user.id != req.params.id) {
            const error = new Error('you are not the ownwe of this account');
            error.status = 401;
            throw error;
        }

        const allsubscription = await subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            data:allsubscription
        });
    } catch (error) {
        next(error);
    }
}