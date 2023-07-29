const Warehousing = require("../models/warehousing");
const asyncHandler = require("express-async-handler");

// // GET theo id danh muc
// const getCategory = asyncHandler(async (req, res) => {
//   try {
//     const errors = { noAdminError: String };
//     const categories = await Category.findById(req.params.id);
//     if (categories.length === 0) {
//       errors.noAdminError = "No category Found";
//       return res.status(404).json(errors);
//     }
//     res.status(200).json({ retObj: categories });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// });

// // get all danh mục
const getWarehousings = asyncHandler(async (req, res) => {
  try {
    const warehousings = await Warehousing.find();
    res.status(200).json({
      success: true,
      message: "Show all warehousing successfully",
      retObj: warehousings,
    });
  } catch (error) {
    console.log("Backend Error", error);
  }
});

// update danh mục
const updateWarehousing = asyncHandler(async (req, res) => {
  try {
    const errors = { warehousingError: String };
    const { productId, quantity } = req.body;
    const warehousingEntry = await Warehousing.findOne({ productId });
    if (!warehousingEntry) {
      errors.warehousingError = "Sản phẩm này chưa tồn tại trong kho này!";
      return res.status(400).json(errors);
    }

    warehousingEntry.quantity = quantity;
    await warehousingEntry.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật số lượng thành công thành công",
      data: warehousingEntry,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

// tạm thời chưa check lỗi
// const deleteCategory = asyncHandler(async (req, res) => {
//   try {
//     const categories = req.body;
//     const errors = { categoryError: String };
//     for (var i = 0; i < categories.length; i++) {
//       var category = categories[i];
//       await Category.findOneAndDelete({ _id: category });
//     }
//     res.status(200).json({ message: "Xóa danh mục thành công" });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// });

module.exports = {
  updateWarehousing,
  getWarehousings,
};
