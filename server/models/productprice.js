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

// productpriceSchema.pre("save", async function (next) {
//   const pricelist = await mongoose
//     .model("Pricelist")
//     .findById(this.pricelistId);
//   console.log("pricelist", pricelist);

//   if (pricelist.isActive) {
//     const product = await mongoose.model("Product").findById(this.productId);
//     const newPrice = this.price;

//     // Cập nhật giá mới cho sản phẩm
//     product.price = newPrice;
//     console.log("newPrice", newPrice);
//     await product.save();
//   }

//   next();
// });
//Export the model
module.exports = mongoose.model("Productprice", productpriceSchema);
