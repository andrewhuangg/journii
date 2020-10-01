const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'Please provide some text for the post'],
    maxlength: [1000, 'Text cannot be more than 500 characters'],
  },
  name: String,
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
  ],
  follows: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: [true, 'Please provide some text for the comment'],
        maxlength: [500, 'Text cannot be more than 500 characters'],
      },
      name: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);
