const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productpriceSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    pricelistId: {
      type: mongoose.Types.ObjectId,
      ref: "Pricelist",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Productprice", productpriceSchema);
