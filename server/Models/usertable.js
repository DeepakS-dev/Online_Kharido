const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already registered."],
    },
    mobile: {
      type: String,
      required: [true, "Mobile no. is required."],
      unique: [true, "Mobile already registered."],
    },
    dob: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: String,
      default: "Inactive",
    },
  },
  {
    timestamps: true,
  }
);

const Usertable = mongoose.model("Usertable", userSchema);

module.exports = Usertable;
