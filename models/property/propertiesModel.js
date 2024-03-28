const mongoose = require("mongoose");

const propertiesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  propertyManager: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PropertyManager",
  },
  image: [
    {
      type: String,
    },
  ],
  details: {
    type: String,
  },

  type: {
    type: String,
    enum: ["Rent", "Sell"],
  },
  propertyType: {
    type: String,
    enum: ["House", "Apartment", "Villa", "Office", "Commercial Building"],
  },
  rooms: {
    type: String,
   
  },
  bathroom: {
    type: String,
   
  },
  size: {
    type: String,
  },
  status: {
    type: String,
    enum: ["On Hold", "Available", "Booked", "Sold", "Unavailable"],
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  price: {
    type: String,
  },
});

propertiesSchema.index({ location: "2dsphere" });

const Properties = mongoose.model("Properties", propertiesSchema);

module.exports = Properties;
