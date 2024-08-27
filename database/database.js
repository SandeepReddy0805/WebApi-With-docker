import mongoose from "mongoose";

async function connectDb() {
    await mongoose.connect('mongodb://mongo:27017/test');
    console.log('connected');
}
export default connectDb;