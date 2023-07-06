const mongoose = require("mongoose");
const crypto = require("crypto");

const CartItemSchema = new mongoose.Schema({
  product: {},
  quantity: Number,
  shop: { type: mongoose.Schema.ObjectId, ref: "Shop" },
  status: {
    type: String,
    default: "Not processed",
    enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
  }
});

const CartItem = mongoose.model('CartItem', CartItemSchema);

const OrderSchema = new mongoose.Schema({
  products: [CartItemSchema],
  customer_name: {
    type: String,
    trim: true,
    required: "Se requiere el nombre"
  },
  customer_email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Por favor complete una dirección de correo electrónico válida"],
    required: "Se requiere correo electronico"
  },
  delivery_address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    country: { type: String }
  },
  payment_id: {
    type: String
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  user: { type: mongoose.Schema.ObjectId, ref: "User" }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };