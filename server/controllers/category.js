const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// xong được api thêm danh muc
const createCategory = asyncHandler(async (req, res) => {
  const response = await Category.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    retObj: response ? response : "Cannot create new category",
  });
});
// GET theo id danh muc OK
const getCategory = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const category = await Category.findById(pid);
  return res.status(200).json({
    success: category ? true : false,
    retObj: category ? category : "Cannot get category",
  });
});

// get all danh mục OK
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().select("categoryName _id");

  return res.status(200).json({
    success: categories ? true : false,
    retObj: categories ? categories : "Cannot get categories",
  });
});

// update danh mục
const updateCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;

  const updatedCategory = await Category.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedCategory ? true : false,
    retObj: updatedCategory ? updatedCategory : "Cannot update category",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const deletedCategory = await Category.findByIdAndDelete(cid);
  return res.status(200).json({
    success: deletedCategory ? true : false,
    retObj: deletedCategory ? deletedCategory : "Cannot delete category",
  });
});

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
