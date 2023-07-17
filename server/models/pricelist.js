const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pricelistSchema = new mongoose.Schema(
  {
    pricelistName: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    applyDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Pricelist", pricelistSchema);