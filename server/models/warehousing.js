const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var warehousingSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    productName: {
      type: String,
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
module.exports = mongoose.model("Warehousing", warehousingSchema);
