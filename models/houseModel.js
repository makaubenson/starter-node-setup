let mongoose = require("mongoose");

let schema = mongoose.Schema({
  numberOfBeds: {
    type: Number,
  },

  premiumHouse: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },

  estateId: {
    type: mongoose.Schema.ObjectId,
    ref: "estateModel",
  },
  locationID: {
    type: mongoose.Schema.ObjectId,
    ref: "locationModel",
  },
  houseName: {
    type: String,
  },
  // locationID: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "locationModel",
  //   required: true,
  // },

  // ownerID: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "ownerModel",
  //   required: true,
  // },
  beddingReplacement: {
    type: Boolean,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  powerAndWaterBill: {
    type: Boolean,
  },
  bathShower: {
    type: Boolean,
  },
  ceiling: {
    type: Boolean,
  },
  furniture: [
    {
      type: String,
    },
  ],
  tiledFloor: {
    type: Boolean,
  },
  price: {
    type: Number,
  },
  deposit: {
    type: Number,
  },
  pictures: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  terms_and_condition: {
    type: String,
  },
});

let model = mongoose.model("houseModel", schema);
module.exports = model;
