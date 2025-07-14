import mongoose from "mongoose";

const uri = process.env.DB_URI || "mongodb://localhost/MiniProject3";

if (!uri) {
    throw new Error("DB_URI environment variable is not set");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(uri)
            .then((mongoose) => {
                console.log("MongoDB Connected");
                return mongoose;
            })
            .catch((error) => {
                console.error("MongoDB Connection Error:", error.message);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
