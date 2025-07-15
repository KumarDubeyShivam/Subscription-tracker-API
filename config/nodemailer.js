import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

export const accountemail = 'shivamsuperstar7@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountemail,
        pass: EMAIL_PASSWORD,
    }
});

export default transporter;