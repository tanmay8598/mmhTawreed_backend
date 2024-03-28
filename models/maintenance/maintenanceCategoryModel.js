const mongoose = require("mongoose");

const maintenanceCategorySchema = mongoose.Schema({
 
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

const MaintenanceCategory = mongoose.model("MaintenanceCategory", maintenanceCategorySchema);

module.exports = MaintenanceCategory;
