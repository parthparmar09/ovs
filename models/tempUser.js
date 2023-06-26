const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema(
  {
    aadhar_number: {
      type: Number,
      required: true,
      unique: true,
      min: 1000000000000000,
      max: 8999999999999999,
    },
    otp: {
      type: Number,
      maxlength: 4,
      minlegth: 4,
      required: [true, `can't proceed without otp`],
    },
    expireAt: {
      type: Date,
      expires: 300,
    },
  },
  {
    timestamps: true,
  }
);

const TempUser =  mongoose.model("TempUser", tempUserSchema);
module.exports = TempUser
