const mongoose = require("mongoose");

const ElectionSchama = new mongoose.Schema({
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assembly",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  results: [
    {
      zone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Zone",
      },
      candidates: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Candidate",
        },
      ],
    },
  ],
});

const Election = mongoose.model("Election", ElectionSchama);
module.exports = Election;
