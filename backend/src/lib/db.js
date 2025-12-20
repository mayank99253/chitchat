import mongoose from 'mongoose'
import { ENV } from './env.js';

export const connectdb = async ()=>{
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log("MONGODB CONNECT" , conn.connection.host)
    } catch (error) {
        console.error("MONDO CONNECTION FAILED ", error);
        process.exit(1) // 1 means failed or 0 means success 
    }
}