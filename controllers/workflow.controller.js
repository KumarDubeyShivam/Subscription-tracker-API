import dayjs from 'dayjs';



import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const { serve } = require('@upstash/workflow/express');

import subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const reminders = [7, 5, 2, 1];

export const sendreminders = serve(async (context) => {
    const { subscriptionid } = context.payload;
    const Subscription = await fetchsubscription(context, subscriptionid);

    if (!Subscription || Subscription.status != 'active') {
        return;
    }

    const renewaldate = dayjs(Subscription.renewaldate);
    if (renewaldate.isBefore(dayjs())) {
        console.log(`renewal date has passed for subscription : ${Subscription}, stopping the subcription`);
        return;
    }

    for (const daysbefore of reminders) {
        const reminderdate = renewaldate.subtract(daysbefore, 'day');

        if (reminderdate.isAfter(dayjs())) {
            await sleepuntilreminder(context,  `reminder ${daysbefore} days before`, reminderdate);
        }

        if (dayjs().isSame(reminderdate, 'day')) await triggerreminder(context, `${daysbefore} days reminder`, Subscription);

        
    }
});

const fetchsubscription = async (context, subscriptionid) => {
    return await context.run('get subscription', async () => {
    return subscription.findById(subscriptionid).populate('user', 'name email'); //i added await here before
});
}

const sleepuntilreminder = async (context, label, date) => {
    console.log(`sleep until ${label} reminder at ${date} `);
    await context.sleepUntil(label, date.toDate());
}

const triggerreminder = async (context, label, subscription) => {
    return await context.run(label, async () => {
        console.log(`triggering ${label} reminder`);
        await sendReminderEmail({
            to: subscription.user?.email,
            type: label,
            subscription,
        })
    })
}