const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number },
  category: { type: String, required: true },
  dimensions: { type: Number },
  stock: { type: Number, required: true, default: 1 },
  description: { type: String },
  color: { type: String },
  images: { type: [String] },
});

module.exports = mongoose.model("Product", productSchema);
