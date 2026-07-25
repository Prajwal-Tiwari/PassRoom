import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URI);

//connecting database
const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;