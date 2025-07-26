
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/users.model.js';
import { JWT_EXPIRES_IN, JWT_SECERT } from '../config/env.js';

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userr = await user.findOne({ email }); 

        if (!userr) {
            const error = new Error("User does not exist. Please sign up!");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, userr.password);
        if (!isPasswordValid) {
            const error = new Error("Invalid password. Please try again.");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            { userid: userr._id },
            JWT_SECERT,
            { expiresIn: JWT_EXPIRES_IN } 
        );

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user: userr
            }
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "Something went wrong",
            _message: error._message || undefined,
            errors: error.errors || undefined,
        });
        next(error);
    }
};

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction(); 

    try {
        const { name, email, password } = req.body;

        const existinguser = await user.findOne({ email }); 
        if (existinguser) {
            const error = new Error("User already exists!");
            error.statusCode = 409;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newusers = await user.create(
            [{ name, email, password: hashedPassword }], 
            { session }
        );

        const token = jwt.sign(
            { userid: newusers[0]._id },
            JWT_SECERT,
            { expiresIn: JWT_EXPIRES_IN } 
        );

        await session.commitTransaction(); 
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newusers[0],
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signout = async (req, res, next) => {
    
};


