const mongoose = require("mongoose");

const PartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
  ],
});

const Party = mongoose.model("Party", PartySchema);
module.exports = Party;
