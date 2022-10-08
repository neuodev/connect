import mongoose, { ObjectId } from "mongoose";
import { IUser } from "./User";

export interface IMessage {
  sender: IUser | ObjectId;
  receiver: IUser | ObjectId;
  text: string;
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Message sender is requried"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Message sender is requried"],
    },
    text: {
      type: String,
      required: [true, "Message text is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default messageSchema;
