const Pricelist = require("../models/pricelist");
const Productprice = require("../models/productprice");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const createPricelist = async (req, res) => {
  try {
    const { pricelistName, applyDate, isActive } = req.body;
    const errors = { pricelistError: String };
    const pricelist = await Pricelist.findOne({ pricelistName });
    if (pricelist) {
      errors.pricelistError =
        "Bảng giá này đã tồn tại vui lòng chọn một tên khác!";
      return res.status(400).json(errors);
    }

    const newPricelist = await new Pricelist({
      pricelistName,
      applyDate,
      isActive,
    });

    await newPricelist.save();

    return res.status(200).json({
      success: true,
      message: "Thêm thành công",
      response: newPricelist,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

const getPricelist = asyncHandler(async (req, res) => {
  const { plid } = req.params;
  const pricelist = await Pricelist.findById(plid);
  return res.status(200).json({
    success: pricelist ? true : false,
    retObj: pricelist ? pricelist : "Cannot get pricelist",
  });
});

const getPricelists = asyncHandler(async (req, res) => {
  const pricelists = await Pricelist.find();

  return res.status(200).json({
    success: pricelists ? true : false,
    retObj: pricelists ? pricelists : "Cannot get pricelists",
  });
});

const updatePricelist = async (req, res) => {
  try {
    const errors = { pricelistError: String };
    const { priceListId, isActive } = req.body;

    if (!priceListId) {
      errors.pricelistError = "Missing priceListId information";
      return res.status(400).json(errors);
    }

    const existingPricelist = await Pricelist.findById(priceListId);
    if (!existingPricelist) {
      errors.pricelistError = "Không tìm thấy bảng giá nào";
      return res.status(404).json(errors);
    }

    if (isActive !== undefined) {
      const applyDate = existingPricelist.applyDate;
      const currentDate = new Date();

      if (applyDate <= currentDate) {
        errors.pricelistError = "Không thể cập nhật bảng giá đã áp dụng!";
        return res.status(400).json(errors);
      }

      existingPricelist.isActive = isActive;
    }

    await existingPricelist.save();

    return res.status(200).json({
      success: true,
      message: "Cập nhật bảng giá thành công",
      response: existingPricelist,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

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
