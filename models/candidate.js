const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Zone",
  },
  age: {
    type: Number,
    required: true
  },
  votes: {
    type: Number,
    required: true,
    min : 0,
    default : 0
  },
  education: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  prior_experience: {
    type: String,
    required: true
  },
  campaign_promises: {
    type: [String],
    required: true
  },
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
