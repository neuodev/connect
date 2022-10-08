import mongoose, { ObjectId } from "mongoose";
import messageSchema, { IMessage } from "./Message";
import { IUser } from "./User";

export interface IGroup {
  name: string;
  admin: IUser | ObjectId;
  room: string;
  members: Array<{ member: IUser | ObjectId }>;
  messages: Array<IMessage>;
}

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, requrie: [true, "Group name is required"] },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: [true, "Admin is required"],
    },
    room: {
      type: String,
      required: [true, "Room Id is required"],
      unique: true,
    },
    members: [
      {
        member: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
);

const Group = mongoose.model<IGroup>("Group", groupSchema);
export default Group;
