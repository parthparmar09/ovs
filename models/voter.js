const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  aadhar_number: {
    type: Number,
    required: true,
    unique: true,
    min: 100000000000,
    max: 999999999999,
  },
  voted :{
    type : Boolean,
    default : false
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",
    required: true,
  },
  assembly: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assembly",
    required: true,
  },
  personal_info: {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      min: 9000000000,
      max: 9999999999,
    },
    residential_info: {
      address: {
        type: String,
        required: true,
      },
      district: {
        type: String,
      },
      state: {
        type: String,
      },
      country: {
        type: String,
        default: "India",
      },
      zipcode: {
        type: Number,
        unique: true,
        min: 380000,
        max: 390000,
        required: true,
      },
      area: {
        type: String,
        enum: ["Urban", "Rural"],
        required: true,
      },
    },
  },
});

const Voter = mongoose.model("Voter", VoterSchema);

module.exports = Voter;
