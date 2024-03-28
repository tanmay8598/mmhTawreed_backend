const mongoose = require("mongoose");

const companyCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const CompanyCategory = mongoose.model(
  "CompanyCategory",
  companyCategorySchema
);

module.exports = CompanyCategory;
