const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, default: 1 },

        price: { type: Number, required: true },
        ecomproduct: {
          type: mongoose.Schema.Types.String,
          ref: "EcomProduct",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String },
      landmark: { type: String, required: true },
      mobileNumber: { type: Number, required: true },
      email: { type: String, required: true },
    },
    emailDelivery: {
      type: String,
    },
    deliverySlot: {
      type: String,
    },
    itemsPrice: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    invoiceId: {
      type: String,
    },
    isPaid: {
      type: Boolean,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paidAt: {
      type: Date,
    },
    deliveryStatus: {
      type: String,
      enum: ["Processing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
