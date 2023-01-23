const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product Schema
const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);
module.exports = Product;
