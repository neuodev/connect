const mongoose = require("mongoose");
const messageSchema = require("./MessageSchema");

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, requrie: [true, "Group name is required"] },
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

const Group = mongoose.model("Group", groupSchema);
export default Group;
