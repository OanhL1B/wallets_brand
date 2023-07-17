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
      type: Array,
    },
    material: {
      type: String,
    },
    size: {
      type: String,
    },
    feature: {
      type: String,
    },
    color: {
      type: String,
      enum: ["Black", "Grown", "Red"], // trước mắt để 3 màu vầy thôi
    },

    slug: {
      // tạo link đường dẫn ví dụ tên sản phẩm là  ví da rất đẹp thì qua slug là vi-da-rat-dep
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    sold: {
      // số sản phẩm đã bán được
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
    quantity: {
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
