import mongoose from 'mongoose'
import { ENV } from './env.js';

export const connectDB = async ()=>{
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MONGODB CONNECTED" , conn.connection.host)
    } catch (error) {
        console.error("ERROR CONNECTION TO MONGOOSE ", error);
        process.exit(1) // 1 means failed or 0 means success 
    }
}