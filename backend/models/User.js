const mongoose = require('mongoose');
const messageSchema = require('./MessageSchema');

const userSchema = new mongoose.Schema({
  createTime: { type: Date, default: Date.now },
  lastLoginTime: { type: Date, default: Date.now },
  username: {
    type: String,
    trim: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'basy'],
    default: 'online',
  },
  avatar: {
    type: String,
    required: [true, 'Avatar is  Required'],
    default: '/images/hero.jpg',
  },
  email: {
    type: String,
    match:[ /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i , 'Invalid Email'],
    unique: [true, 'Email already exist'],
  },
  password: {
    type: String,
    required: [true, 'Userpassword is required'],
    minLength: [6, 'Password must be at least 6 chars'],
  },
  friends: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      messages: [messageSchema],
      room: {
        type: String,
        required: [true, 'Room Id is required'],
        unique: true,
      },
    },
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
