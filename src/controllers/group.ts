import Group from "../models/Group";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { getErrMsg } from "../utils/error";
import { IMessage } from "../models/Message";
import User from "../models/User";

export type CreateGroup = {
  admin: string;
  name: string;
  members: Array<string>;
};

export async function createGroup(data: CreateGroup) {
  try {
    const { members, name, admin } = data;
    // group name mast be unique
    const alreadyExist = await Group.findOne({
      $and: [{ admin }, { name }],
    });

    if (alreadyExist) {
      return {
        error: "Can't create two groups with the same name",
      };
    }
    const room = uuid();
    await Group.create({ name, room, admin, members });
    return { success: true };
  } catch (err) {
    return {
      error: getErrMsg(err),
    };
  }
}
export async function getGoups(userId: string) {
  try {
    const groups = await Group.find({
      $or: [{ "members.member": userId }, { admin: userId }],
    }).populate({ path: "members.member", select: "username avatar " });

    return groups;
  } catch (err) {
    return {
      error: getErrMsg(err),
    };
  }
}
export async function getGroupMessages(groupId: string) {
  try {
    const groups = await Group.findById(groupId).populate({
      path: "messages.sender",
      select: "username",
    });

    if (!groups) throw new Error("Group not found");

    return {
      success: true,
      messages: groups.messages,
    };
  } catch (err) {
    return {
      error: getErrMsg(err),
    };
  }
}

export type SendGroupMessage = {
  groupId: string;
  userId: string;
  text: string;
};

export async function sendGroupMessage({
  groupId,
  userId,
  text,
}: SendGroupMessage) {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return {
        error: "Group Not found",
      };
    }

    //get a reciver
    const receiver = group.members[0];
    const sender = await User.findOne({ id: userId });
    if (!sender) throw new Error("User not found");
    // fromate the message
    const message: IMessage = {
      sender: sender,
      receiver: receiver.member,
      text,
    };

    group.messages.push(message);

    await group.save();
    const groupMessages = await Group.findById(groupId).populate({
      path: "messages.sender",
      select: "username",
    });

    return {
      success: true,
      messages: groupMessages ? groupMessages.messages : [],
    };
  } catch (err) {
    return {
      error: getErrMsg(err),
    };
  }
}

export type RemoveMember = {
  groupId: string;
  userId: string;
};

export async function removeMember({ groupId, userId }: RemoveMember) {
  try {
    const group = await Group.findById(groupId);
    if (!group) throw new Error("Group not found");
    //remove group if the user is admin
    if (group.admin.toString() === userId) {
      await Group.findByIdAndDelete(groupId);
    } else {
      // remove the user if  he is  a member
      group.members = group.members.filter(
        (member) => member.member.toString() !== userId.toString()
      );
    }
    await group.save();
    return {
      success: true,
    };
  } catch (err) {
    return {
      error: getErrMsg(err),
    };
  }
}
