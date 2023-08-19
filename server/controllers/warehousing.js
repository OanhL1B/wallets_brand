const Warehousing = require("../models/warehousing");
const asyncHandler = require("express-async-handler");

// // get all danh mục
const getWarehousings = asyncHandler(async (req, res) => {
  try {
    const warehousings = await Warehousing.find()
      .populate({
        path: "productId",
        select: "productName",
      })
      .populate({
        path: "userId",
        select: "lastName firstName",
      });
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
// const updateWarehousing = asyncHandler(async (req, res) => {
//   try {
//     const errors = { warehousingError: String };
//     const { productId, quantity } = req.body;
//     const warehousingEntry = await Warehousing.findOne({ productId });
//     if (!warehousingEntry) {
//       errors.warehousingError = "Sản phẩm này chưa tồn tại trong kho này!";
//       return res.status(400).json(errors);
//     }

//     warehousingEntry.quantity = quantity;
//     await warehousingEntry.save();

//     res.status(200).json({
//       success: true,
//       message: "Cập nhật số lượng thành công thành công",
//       data: warehousingEntry,
//     });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// });
const updateWarehousing = asyncHandler(async (req, res) => {
  try {
    const errors = { warehousingError: String };
    const { productId, quantity, userId } = req.body;
    const warehousingEntry = await Warehousing.findOne({ productId });
    if (!warehousingEntry) {
      errors.warehousingError = "Sản phẩm này chưa tồn tại trong kho này!";
      return res.status(400).json(errors);
    }

    warehousingEntry.quantity = quantity;

    warehousingEntry.userId = userId;

    await warehousingEntry.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật số lượng thành công",
      data: warehousingEntry,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

module.exports = {
  updateWarehousing,
  getWarehousings,
};
