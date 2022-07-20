const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    minlength: 6,
    requred: true,
  },
  email: {
    type: String,
    maxlength: 30,
    require: true,
    unique: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", userSchema);
