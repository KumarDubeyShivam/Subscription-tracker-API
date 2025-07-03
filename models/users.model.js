import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required !"],
        trim: true,
        minLength: 2,
        maxLenght: 50,
    },

    email: {
        type: String,
        required: [true, "Email is required !"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@+\S+\.+\S+/, "please fill in a valid email id"],

    },

    password: {
        type: String,
        required: [true, "please enter a password"],
        minLength: 6,

    }
}, { timestamps: true });

const user = mongoose.model("User", userschema);

export default user;