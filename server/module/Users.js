const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    default: null,
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
  followers: {
    type: Array,
    default: [],
  },
  follow_ups: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", userSchema);
