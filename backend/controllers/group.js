const User = require('../models/User');
const Group = require('../models/Group');
const { v4 } = require('uuid');
const moment = require('moment');

exports.createGroup = async function (data) {
  try {
    const { groupMembers, groupName, admin } = data;
    // group name mast be unique
    const alreadyExist = await Group.findOne({
      $and: [{ admin }, { groupName }],
    });
    if (alreadyExist) {
      return {
        error: "Can't create two groups with the same name",
      };
    }
    const room = v4();
    // add each member to the room
    const group = await Group.create({ ...data, room });
    for (let i = 0; i < groupMembers.length; i++) {
      const member = groupMembers[i].friendId;
      group.members.push({ member });
    }
    //save the changes
    await group.save();

    return { success: true };
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
exports.getGoups = async function (userId) {
  try {
    const groups = await Group.find({
      $or: [{ 'members.member': userId }, { admin: userId }],
    }).populate({ path: 'members.member', select: 'username avatar ' });

    return groups;
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
exports.getGroupMessages = async function (groupId) {
  try {
    const groups = await Group.findById(groupId).populate({
      path: 'messages.sender',
      select: 'username',
    });

    return {
      success: true,
      messages: groups.messages,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
exports.createGroupMessage = async function (groupId, userId, text) {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return {
        error: 'Group Not found',
      };
    }

    const time = moment().format('h:mm a');
    //get a reciver
    const receiver = group.members[0].member;
    // fromate the message
    const message = {
      time,
      sender: userId,
      receiver,
      text,
    };

    group.messages.push(message);

    await group.save();
    const groupMessages = await Group.findById(groupId).populate({
      path: 'messages.sender',
      select: 'username',
    });

    return {
      success: true,
      messages: groupMessages.messages,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
};

exports.leave_remove_group = async function (groupId, userId) {
  try {
    const group = await Group.findById(groupId);
    //remove group if the user is admin
    if (group.admin.toString() === userId) {
      await Group.findByIdAndDelete(groupId);
    } else {
      // remove the user if  he is  a member
      group.members = group.members.filter(
        member => member.member.toString() !== userId.toString()
      );
    }
    await group.save();
    return {
      success: true,
    };
  } catch (err) {
    return {
      error: err.message,
    };
  }
};
