import jwt from 'jsonwebtoken';
import user from "../models/users.model.js";
import { JWT_SECERT } from '../config/env.js';


const authorize = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) return res.status(401).json({ message: 'unauthorized' });

        const decoded = jwt.verify(token, JWT_SECERT);

        const users = await user.findOne({ _id: decoded.userid });

        if (!users) return res.status(401).json({ message: 'unauthorized' });

        req.user = users;
        next();
    } catch (error) {
        res.status(401).json({ message: 'unauthorized', error: error.message });
    }
}

export default authorize;