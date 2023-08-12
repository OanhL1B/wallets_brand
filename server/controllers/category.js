const Category = require("../models/category");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const errors = { categoryError: String };
    const { categoryName } = req.body;
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      errors.categoryError = "Danh mục này đã tồn tại";
      return res.status(400).json(errors);
    }

    const newCategory = await new Category({
      categoryName,
    });

    await newCategory.save();
    return res.status(200).json({
      success: true,
      message: "Thêm mới danh mục thành công!",
      retObj: newCategory,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

// GET theo id danh muc
const getCategory = asyncHandler(async (req, res) => {
  try {
    const errors = { noAdminError: String };
    const categories = await Category.findById(req.params.id);
    if (categories.length === 0) {
      errors.noAdminError = "No category Found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ retObj: categories });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

// get all danh mục
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find().select("categoryName _id");
    res.status(200).json({
      success: true,
      message: "Show all category successfully",
      retObj: categories,
    });
  } catch (error) {
    console.log("Backend Error", error);
  }
});

// update danh mục

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const errors = { categoryError: String };
    const { categoryId, categoryName } = req.body;

    if (!categoryId) {
      errors.categoryError = "Thiếu thông tin categoryId";
      return res.status(400).json(errors);
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ categoryError: "Danh mục không tồn tại" });
    }

    const existingCategory = await Category.findOne({
      categoryName: categoryName,
      _id: { $ne: categoryId },
    });

    if (existingCategory) {
      return res.status(400).json({
        categoryError:
          "Tên danh mục này đã tồn tại, vui lòng chọn một tên khác!",
      });
    }

    category.categoryName = categoryName;
    await category.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const categories = req.body;
    const errors = { categoryError: String };

    for (let i = 0; i < categories.length; i++) {
      const categoryId = categories[i];

      const productsInCategory = await Product.find({ category: categoryId });

      if (productsInCategory.length > 0) {
        return res.status(400).json({
          categoryError: "Không thể xóa danh mục có chứa sản phẩm",
        });
      }

      await Category.findOneAndDelete({ _id: categoryId });
    }

    res.status(200).json({ success: true, message: "Xóa danh mục thành công" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

module.exports = {
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
