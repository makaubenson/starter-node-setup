let mongoose = require("mongoose");

let schema = mongoose.Schema({
  userID: {
    type: String,
  },

  houseID: {
    type: String,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  amount: {
    type: Number,
    required: [true, "The price must be set"],
  },
});

let model = mongoose.model("BookingModel", schema);
module.exports = model;
