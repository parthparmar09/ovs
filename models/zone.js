const mongoose = require("mongoose");

const ZoneSchema = new mongoose.Schema({
  name: {
    type: Number,
    max : 5,
    min : 1,
    required: true,
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
  ],
  district: {
    type : String,
    required : true
  },
});
const Zone =  mongoose.model('Zone' , ZoneSchema);
module.exports = Zone ; 