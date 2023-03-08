const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userid:{type: String, required:true},
  like:{type: Number, default: 0},
  images: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Products", productSchema)