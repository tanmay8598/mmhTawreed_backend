const mongoose = require("mongoose");

const ecomcategorySchema = mongoose.Schema({
  
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

const EcomCategory = mongoose.model("EcomCategory", ecomcategorySchema);

module.exports = EcomCategory;
