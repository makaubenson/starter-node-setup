/**
 *  { "location_name": "Nyawita",
 * "location": ["11111111111", "222222222"] },
 */
let mongoose = require("mongoose");

let schema = mongoose.Schema({
  coordinates: [
    {
      type: Number,
    },
  ],
  locationName: {
    type: String,
  },
});
let model = mongoose.model("locationModel", schema);
module.exports = model;
