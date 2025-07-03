import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../models/users.model';
import { JWT_EXPIRES_IN, JWT_SECERT } from '../config/env';

export const signin = async (req, res, next) => { };

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransction();

    try {
        const { name, email, password } = req.body;

        const existinguser = await user.findOne(email);
        if (existinguser) {
            const error = new Error("user already exists!");
            error.statusCode = 409;
            throw error;
        }

        //hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newusers = await user.create([{ name, email, hashedpassword }], { session });

        const token = jwt.sign({ userid: newusers[0] }, JWT_SECERT, { expriesIn: JWT_EXPIRES_IN });


        await session.commitTranscation();
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signout = async (req, res, next) => { };