const Productprice = require("../models/productprice");
const asyncHandler = require("express-async-handler");

// const createProductprice = asyncHandler(async (req, res) => {
//   const response = await Productprice.create(req.body);
//   return res.status(200).json({
//     success: response ? true : false,
//     retObj: response ? response : "Cannot create new productprice",
//   });
// });

const createProductprice = asyncHandler(async (req, res) => {
  try {
    const errors = { productpriceError: String };
    const { productId, pricelistId } = req.body;

    const existingProductprice = await Productprice.findOne({
      productId,
      pricelistId,
    });
    if (existingProductprice) {
      errors.productpriceError =
        "A record with the same productId and pricelistId already exists";
      return res.status(400).json(errors);
    }

    const newProductprice = await Productprice.create(req.body);

    return res.status(200).json({
      success: true,
      message: "New Productprice created successfully!!",
      retObj: newProductprice,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const getProductprice = asyncHandler(async (req, res) => {
  const { ppid } = req.params;
  const productprice = await Productprice.findById(ppid);
  return res.status(200).json({
    success: productprice ? true : false,
    retObj: productprice ? productprice : "Cannot get productprice",
  });
});

const getProductprices = asyncHandler(async (req, res) => {
  const productprices = await Productprice.find()
    .populate({
      path: "productId",
      select: "productName",
    })
    .populate({
      path: "pricelistId",
      select: "pricelistName",
    });

  return res.status(200).json({
    success: productprices ? true : false,
    retObj: productprices ? productprices : "Cannot get productprices",
  });
});

// const updateProductprice = asyncHandler(async (req, res) => {
//   const errors = { productPriceError: String };
//   const { ppid } = req.params;
//   const { productpriceId, price } = req.body;
//   const updatedProductprice = await Productprice.findByIdAndUpdate(
//     ppid,
//     req.body,
//     {
//       new: true,
//     }
//   );
//   return res.status(200).json({
//     success: updatedProductprice ? true : false,
//     retObj: updatedProductprice
//       ? updatedProductprice
//       : "Cannot update Productprice",
//   });
// });
const updateProductprice = asyncHandler(async (req, res) => {
  try {
    const errors = { productPriceError: String };
    const { productpriceId, price } = req.body; // Get productpriceId and price from req.body

    if (!productpriceId) {
      errors.productPriceError = "Missing productpriceId information";
      return res.status(400).json(errors);
    }

    const updatedProductprice = {
      price: price,
    };

    const productprice = await Productprice.findByIdAndUpdate(
      productpriceId,
      updatedProductprice,
      {
        new: true,
      }
    );

    if (!productprice) {
      errors.productPriceError = "Productprice not found";
      return res.status(404).json(errors);
    }

    return res.status(200).json({
      success: true,
      retObj: productprice,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const deleteProductprice = asyncHandler(async (req, res) => {
  const { ppid } = req.params;
  const deletedProductprice = await Productprice.findByIdAndDelete(ppid);
  return res.status(200).json({
    success: deletedProductprice ? true : false,
    retObj: deletedProductprice
      ? deletedProductprice
      : "Cannot delete Productprice",
  });
});

module.exports = {
  createProductprice,
  getProductprices,
  getProductprice,
  updateProductprice,
  deleteProductprice,
};
