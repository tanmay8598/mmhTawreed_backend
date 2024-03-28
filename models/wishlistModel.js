const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
      
        properties: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Properties",
        },
        ecomproduct: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "EcomProduct",
        },
            
        companies: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Companies",
        },
      },

    ],
    
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
