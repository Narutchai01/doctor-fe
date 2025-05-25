import mongoose from "mongoose";

const MONGODB_URI = String(process.env.NEXT_PUBLIC_MONGODB_URI);

async function dbConnect() {
    try {
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default dbConnect;