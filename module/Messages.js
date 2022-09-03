const mongoose = require("mongoose");
const { Schema } = mongoose;

const messagesSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  providerId: {
    type: String,
    required: true,
  },
  replays: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("messages", messagesSchema);
