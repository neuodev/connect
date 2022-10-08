import mongoose, { InferSchemaType, Model, ObjectId } from "mongoose";
import messageSchema from "./MessageSchema";

export enum UserStatus {
  Online = "online",
  Offline = "offline",
  Busy = "Busy",
  Focusing = "focusing",
}

interface IUser {
  username: string;
  avatar: string;
  email: string;
  password: string;
  lastLogin: Date;
  status: UserStatus;
  friends: Array<{ user: ObjectId | IUser; messages: Array<{}>; room: string }>;
  groups: Array<ObjectId | IUser>;
}

const userSchema = new mongoose.Schema(
  {
    lastLogin: { type: Date, default: Date.now },
    username: {
      type: String,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: [true, "Avatar is  Required"],
      default: "/images/hero.jpg",
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Invalid Email",
      ],
      unique: [true, "Email already exist"],
    },
    password: {
      type: String,
      required: [true, "Userpassword is required"],
      minLength: [6, "Password must be at least 6 chars"],
    },
    status: {
      type: String,
      enum: [
        UserStatus.Online,
        UserStatus.Offline,
        UserStatus.Busy,
        UserStatus.Focusing,
      ],
      default: "online",
    },
    friends: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        messages: [messageSchema],
        room: {
          type: String,
          required: [true, "Room Id is required"],
        },
      },
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
