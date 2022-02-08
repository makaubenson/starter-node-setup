let mongoose = require("mongoose");

let schema = mongoose.Schema({
  locationID: {
    type: String,
  },
  estateName: {
    type: String,
    required: [true, "estatename must be set"],
  },
  ownerId: {
    type: String,
  },

  totalHouses: {
    type: Number,
  },
  plotNumber: {
    type: Number,
  },
  houseVarinents: [{ type: String }],
  additionalCharges: {
    type: Number,
  },
  security: {
    type: String,
  },
});

let model = mongoose.model("estateModel", schema);
module.exports = model;
