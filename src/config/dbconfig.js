import mongoose from "mongoose";

const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connection is successful ")
    }catch(error){
        console.error("Database connection is error",error.message)
        process.exit(1);
    }
}

export default connectDB
