import mongoose from 'mongoose'

export const connectdb = async ()=>{
    try {
        const { MONGO_URI } = process.env
        if(!MONGO_URI) throw new Error("MONGO_URI is not set ")

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB CONNECT" , conn.connection.host)
    } catch (error) {
        console.error("MONDO CONNECTION FAILED ", error);
        process.exit(1) // 1 means failed or 0 means success 
    }
}