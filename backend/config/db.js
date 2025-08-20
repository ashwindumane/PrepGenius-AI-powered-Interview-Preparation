import mongoose, { mongo } from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected")
    } catch (error) {
        console.log(error);
        return error;
    }
}

export default connectDB