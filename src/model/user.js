const mongoose = require("mongoose");
const invoice = require("./invoice");
const Invoice = require("./invoice");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "eamil is required"],
      unique: true,
    },
    password: { type: String, require: [true, "password is required"] },
    balance: { type: Number, default: 0 },
    phoneNumber: { type: Number, require },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    DOB: { type: String },
    idImageUrl: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    role: {
      type: String,
      enum: ["BASIC", "ADMIN", "SUPERADMIN"],
      default: "BASIC",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userSchema);
