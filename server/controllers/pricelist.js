// xem lại chức năng kiểu cập nhật giá thì sẽ lấy giá nào ở productprice nha, cái này hơi quan trọng 1 chút, h làm qua
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
      errors.pricelistError = "Đã tồn tại rồi";
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

// const updatePricelist = async (req, res) => {
//   try {
//     const errors = { pricelistError: String };
//     const { pricelistName, applyDate, isActive, priceListId } = req.body;

//     if (!priceListId) {
//       errors.pricelistError = "Thiếu thông tin priceListId";
//       return res.status(400).json(errors);
//     }

//     const existingPricelist = await Pricelist.findById(priceListId);
//     if (!existingPricelist) {
//       errors.pricelistError = "Bảng giá không tồn tại";
//       return res.status(404).json(errors);
//     }

//     if (pricelistName) {
//       existingPricelist.pricelistName = pricelistName;
//     }

//     if (applyDate) {
//       existingPricelist.applyDate = applyDate;
//     }

//     if (isActive) {
//       existingPricelist.isActive = isActive;
//     }

//     await existingPricelist.save();

//     if (isActive) {
//       const productprices = await Productprice.find({
//         pricelistId: existingPricelist._id,
//       });
//       if (productprices.length !== 0) {
//         for (let i = 0; i < productprices.length; i++) {
//           const product = await Product.findById(productprices[i].productId);
//           if (product) {
//             product.price = productprices[i].price;
//             await product.save();
//           }
//         }
//       }
//     } else {
//       const productprices = await Productprice.find({
//         pricelistId: existingPricelist._id,
//       });
//       if (productprices.length !== 0) {
//         const productIds = productprices.map((pp) => pp.productId);
//         await Product.updateMany(
//           { _id: { $in: productIds } },
//           { $set: { price: 0 } }
//         );
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Cập nhật bảng giá thành công",
//       response: existingPricelist,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Lỗi server" });
//   }
// };

const updatePricelist = async (req, res) => {
  try {
    const errors = { pricelistError: String };
    const { pricelistName, applyDate, isActive, priceListId } = req.body;

    if (!priceListId) {
      errors.pricelistError = "Missing priceListId information";
      return res.status(400).json(errors);
    }

    const existingPricelist = await Pricelist.findById(priceListId);
    if (!existingPricelist) {
      errors.pricelistError = "Pricelist not found";
      return res.status(404).json(errors);
    }

    if (pricelistName) {
      existingPricelist.pricelistName = pricelistName;
    }

    if (applyDate) {
      existingPricelist.applyDate = applyDate;
    }

    if (isActive !== undefined) {
      existingPricelist.isActive = isActive;
    }

    await existingPricelist.save();

    // if (isActive) {
    //   const activePricelist = await Pricelist.findOne({ isActive: true });

    //   if (activePricelist) {
    //     const activeProductprices = await Productprice.find({
    //       pricelistId: activePricelist._id,
    //     });

    //     for (const productprice of activeProductprices) {
    //       // Find the corresponding Productprice in the new Pricelist
    //       const newProductprice = await Productprice.findOne({
    //         pricelistId: existingPricelist._id,
    //         productId: productprice.productId,
    //       });

    //       if (newProductprice) {
    //         // If the Productprice exists, update its price to the activePricelist price
    //         newProductprice.price = productprice.price;
    //         // Add other fields here if you want to update them as well
    //         await newProductprice.save();
    //       } else {
    //         // If the Productprice does not exist in the new Pricelist, create a new entry
    //         const newProductprice = new Productprice({
    //           pricelistId: existingPricelist._id,
    //           productId: productprice.productId,
    //           price: productprice.price,
    //           // Add other fields here if necessary
    //         });
    //         await newProductprice.save();
    //       }
    //     }
    //   }
    // }

    const isActivated = existingPricelist.isActive && isActive;
    if (isActivated) {
      const activePricelist = await Pricelist.findOne({ isActive: true });

      if (activePricelist) {
        const activeProductprices = await Productprice.find({
          pricelistId: activePricelist._id,
        });

        for (const productprice of activeProductprices) {
          // Find the corresponding Productprice in the new Pricelist
          const newProductprice = await Productprice.findOne({
            pricelistId: existingPricelist._id,
            productId: productprice.productId,
          });

          if (newProductprice) {
            // If the Productprice exists, update its price to the activePricelist price
            newProductprice.price = productprice.price;
            // Add other fields here if you want to update them as well
            await newProductprice.save();
          } else {
            // If the Productprice does not exist in the new Pricelist, create a new entry
            const newProductprice = new Productprice({
              pricelistId: existingPricelist._id,
              productId: productprice.productId,
              price: productprice.price,
              // Add other fields here if necessary
            });
            await newProductprice.save();
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Pricelist updated successfully",
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
