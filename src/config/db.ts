import mongoose from "mongoose";
import "colors";
import { getErrMsg } from "../utils/error";

const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  try {
    if (!uri) throw new Error("Missing MongoDB URI");
    const con = await mongoose.connect(uri);
    console.log(`Connected to MongoDB ${con.connection.host} `.bgGreen);
  } catch (err) {
    let msg = getErrMsg(err);
    console.log(msg.red.inverse);
    process.exit(1);
  }
};

export default connectDB;
