import mongoose, { Mongoose } from "mongoose";
import { dbURL } from "./config.js";

const connectDB = async()=>{
  try {
    //success
    const conn= await mongoose.connect(dbURL)
    console.log(`connected to the database: ${conn.connection.host}`)
  } catch (error) {
    //error
    console.log(`error connecting to the database${error}`);
    process.exit(1)
  }
}
export default connectDB;

