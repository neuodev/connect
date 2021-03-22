const User = require('../models/User');
const { v4 } = require('uuid');
const moment = require('moment');

exports.createUser = async function (data) {
  try {
    const { email } = data;
    const user = await User.findOne({ email });
    if (user) {
      return {
        error: 'User Already Exist',
      };
    } else {
      const newUser = await User.create(data);
      return {
        success: true,
        user: {
          userId: newUser._id,
          username: newUser.username,
          friends: newUser.friends,
          groups: newUser.groups,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      };
    }
  } catch (err) {
    return {
      error: err.message,
    };
  }
};

exports.login = async function (data) {
  try {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      return {
        error: 'Please enter valid email and password ',
      };
    }
    if (user.password.toString() !== password) {
      return {
        error: 'Please enter valid email and password ',
      };
    }

    return {
      success: true,
      user: {
        userId: user._id,
        username: user.username,
        friends: user.friends,
        groups: user.groups,
        email: user.email,
        status: user.status,
        avatar: user.avatar,
      },
    };
  } catch (err) {
    return {
      error: "can't find the user.",
    };
  }
};

// get all users
exports.getUsers = async function () {
  try {
    const users = await User.find({}).select('username email avatar');
    if (!users) {
      return {
        error: 'No users founded',
      };
    }

    const count = users.length;

    return { count, users };
  } catch (err) {
    return {
      error: 'No Users Founded',
    };
  }
};

exports.addFriend = async function (friendId, userId) {
  try {
    if (!userId) return { error: 'Unauthorized to add friends' };
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    // validate the users
    if (!user || !friend) return { error: 'User Not found' };
    // check if the user add himself
    if (userId === friendId)
      return { error: "Can't add youself as an a friend" };
    // check if they are already friends
    const isAreadyFriend = user.friends.find(
      friend => friend.user.toString() === friendId
    );
    if (isAreadyFriend)
      return {
        error: 'You are already friends',
      };
    // add as friends
    const room = v4();
    user.friends.push({ user: friend._id, room });
    friend.friends.push({ user: user._id, room });
    await user.save();
    await friend.save();

    return {
      success: true,
    };
  } catch (error) {
    return { error: error.message };
  }
};
exports.getFriends = async function (userId) {
  try {
    if (!userId) return { error: 'Unauthorized to add friends' };
    const user = await User.findById(userId).populate({
      path: 'friends.user',
      select: 'username email avatar',
    });
    // validate the user
    if (!user) return { error: 'User Not found' };
    const friends = user.friends;

    return {
      success: true,
      friends,
    };
  } catch (error) {
    return { error: error.message };
  }
};
exports.sendMessage = async function (friendId, userId, text) {
  try {
    if (!userId) return { error: 'Unauthorized to add friends' };
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    // validate the users
    if (!user) return { error: 'User Not found' };
    if (!friend) return { error: 'Friend Not found' };
    // check if the user add himself
    // check if they are already friends
    const isFriend = user.friends.find(
      friend => friend.user.toString() === friendId
    );
    if (!isFriend)
      return {
        error: "Can't send Message to this user ",
      };
    const time = moment().format('h:mm a');
    // find the friend
    const findFriend = user.friends.find(
      friend => friend.user.toString() === friendId
    );
    const message = {
      time,
      sender: user._id,
      receiver: friend._id,
      text,
    };
    findFriend.messages.push(message);
    // find the user in the his friend set
    const findUser = friend.friends.find(
      friend => friend.user.toString() === userId
    );
    findUser.messages.push(message);
    await user.save();
    await friend.save();

    return {
      success: true,
    };
  } catch (error) {
    return { error: error.message };
  }
};

exports.getMessages = async (userId, friendId) => {
  try {
    const user = await User.findById(userId)
      .populate({
        path: 'friends.messages.receiver',
        select: 'username ',
      })
      .populate({
        path: 'friends.messages.sender',
        select: 'username ',
      });

    if (!user) {
      return {
        error: 'User Not Found',
      };
    }

    const friend = user.friends.find(
      friend => friend.user.toString() === friendId
    );
    if (!friend) {
      return {
        error: 'Friend Not Found',
      };
    }
    return {
      success: true,
      messages: friend.messages,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

exports.setUserStatus = async (userId, status) => {
  const user = await User.findById(userId);
  if (!user) {
    return {
      error: 'User not found',
    };
  }
  user.status = status;
  await user.save();
  return {
    success: true,
  };
};
exports.getUserStatus = async userId => {
  const user = await User.findById(userId);
  if (!user) {
    return {
      error: 'User not found',
    };
  }

  return user.status;
};

exports.unFriend = async (userId, friendId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        error: 'User not found',
      };
    }
    user.friends = user.friends.filter(
      friend => friend.user.toString() !== friendId
    );
    await user.save();
    return {
      success: true,
    };
  } catch (error) {
    return { error: error.message };
  }
};

exports.getUserById = async userId => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        error: 'User Not Found',
      };
    }
    return {
      success: true,
      user: {
        userId: user._id,
        username: user.username,
        friends: user.friends,
        groups: user.groups,
        email: user.email,
        status: user.status,
        avatar: user.avatar,
      },
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

exports.updateUser = async (
  userId,
  { username, email, oldPassword, newPassword }
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        error: 'User Not Found',
      };
    }

    user.username = username || user.username;
    user.email = email || user.email;

    if (oldPassword && newPassword) {
      if (user.password.toString() === oldPassword) {
        user.password = newPassword;
      } else {
        return {
          error: "Passwords doesn't matches",
        };
      }
    }
    await user.save();
    return {
      success: true,
    };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};
