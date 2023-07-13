const Productprice = require("../models/productprice");
const asyncHandler = require("express-async-handler");

const createProductprice = asyncHandler(async (req, res) => {
  const response = await Productprice.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    retObj: response ? response : "Cannot create new productprice",
  });
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
  const productprices = await Productprice.find();

  return res.status(200).json({
    success: productprices ? true : false,
    retObj: productprices ? productprices : "Cannot get productprices",
  });
});

const updateProductprice = asyncHandler(async (req, res) => {
  const { ppid } = req.params;

  const updatedProductprice = await Productprice.findByIdAndUpdate(
    ppid,
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: updatedProductprice ? true : false,
    retObj: updatedProductprice
      ? updatedProductprice
      : "Cannot update Productprice",
  });
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
