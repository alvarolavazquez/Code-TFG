const mongoose = require('mongoose');
const crypto = require('crypto');

const ProductURLSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Se requiere el nombre'
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    required: "Quantity is required"
  },
  type: {
    type: String
  },
  steps: [{
    type: String
  }],
  price: {
    type: Number,
    required: "Se necesita el precio"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' }
});

module.exports = mongoose.model('ProductURL', ProductURLSchema);