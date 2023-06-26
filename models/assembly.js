const mongoose = require("mongoose");

const AssemblySchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  districts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },
  ],
  parties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
    },
  ],
  seats: {
    type: Number,
    required: true,
  },
});

const Assembly = mongoose.model("Assembly", AssemblySchema);

module.exports = Assembly;
