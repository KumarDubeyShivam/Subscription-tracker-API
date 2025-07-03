import mongoose from "mongoose";

import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if (!MONGODB_URI) {
    throw new Error("Please define the mongo db uri in the env dev file");
};



const connect2database = async () => {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log(`Connected to mongo db in ${NODE_ENV} mode`);
    }
    catch (error) {
        console.error("Error connecting to mongodb database", error);

        process.exit(1);
    }
}

export default connect2database;