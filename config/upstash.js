import { QSTASH_TOKEN, QSTASH_URL } from './env.js';
import { Client as Workflowclient } from '@upstash/workflow';

export const workflowclient = new Workflowclient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN
});