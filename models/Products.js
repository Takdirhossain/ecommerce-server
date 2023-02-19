const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: Number, required: true },
  discount: { type: String },
  discountpercent: { type: String },
  images: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema)