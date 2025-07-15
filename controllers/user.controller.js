import user from "../models/users.model.js";

export const getuser = async (req, res, next) => {
    try {
        const users = await user.find();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

export const getuserbyid = async (req, res, next) => {
    try {
        const users = await user.findOne(req.params.id).select('-password');

        if (!users) {
            const error = new Error("user not found !");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};