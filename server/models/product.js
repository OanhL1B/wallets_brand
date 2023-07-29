const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    images: {
      thumb: String,
      ortherimg: Array,
    },
    material: {
      type: String,
    },
    size: {
      type: String,
    },
    design: {
      type: String,
    },
    color: {
      type: Array,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    sold: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
