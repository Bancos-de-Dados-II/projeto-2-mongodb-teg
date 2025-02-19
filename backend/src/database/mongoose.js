import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

connectar();

async function connectar(){
    await mongoose.connect(process.env.MONGO_URL);
}

export default mongoose;
