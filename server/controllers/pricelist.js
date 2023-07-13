const Pricelist = require("../models/pricelist");
const asyncHandler = require("express-async-handler");

const createPricelist = asyncHandler(async (req, res) => {
  const response = await Pricelist.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    retObj: response ? response : "Cannot create new category",
  });
});

const getPricelist = asyncHandler(async (req, res) => {
  const { plid } = req.params;
  const pricelist = await Pricelist.findById(plid);
  return res.status(200).json({
    success: pricelist ? true : false,
    retObj: pricelist ? pricelist : "Cannot get pricelist",
  });
});

const getPricelists = asyncHandler(async (req, res) => {
  const pricelists = await Pricelist.find().select("pricelistName _id");

  return res.status(200).json({
    success: pricelists ? true : false,
    retObj: pricelists ? pricelists : "Cannot get pricelists",
  });
});

const updatePricelist = asyncHandler(async (req, res) => {
  const { plid } = req.params;

  const updatedPricelist = await Pricelist.findByIdAndUpdate(plid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedPricelist ? true : false,
    retObj: updatedPricelist ? updatedPricelist : "Cannot update pricelist",
  });
});

const deletePricelist = asyncHandler(async (req, res) => {
  const { plid } = req.params;
  const deletedPricelist = await Pricelist.findByIdAndDelete(plid);
  return res.status(200).json({
    success: deletedPricelist ? true : false,
    retObj: deletedPricelist ? deletedPricelist : "Cannot delete pricelist",
  });
});

module.exports = {
  createPricelist,
  getPricelist,
  getPricelists,
  updatePricelist,
  deletePricelist,
};
