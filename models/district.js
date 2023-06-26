const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
  },
  zones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
    },
  ],
});

const District = mongoose.model("District", DistrictSchema);
module.exports = District;
