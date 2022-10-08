const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  time: {
    type: String,
    default: '00:00',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Message sender is requried'],
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Message sender is requried'],
  },
  text: {
    type: String,
    required: [true, 'Message text is required'],
  },
});

module.exports = messageSchema;
