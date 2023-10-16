const Product = require("../models/product");
const Warehousing = require("../models/warehousing");
const ProductPrice = require("../models/productprice");
const Pricelist = require("../models/pricelist");
const Cart = require("../models/cart");
const category = require("../models/category");

const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const message = require("../constan/error");

// xong được api thêm sản phẩm

const createProduct = asyncHandler(async (req, res) => {
  try {
    const { productName, category, material, design, description } = req.body;
    if (!productName || !category || !material || !design || !description)
      return res.status(400).json({
        success: false,
        mes: message.MISSING_INPUT,
      });
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        mes: message.PRODUCT_ERROR,
      });
    }
    if (req.body && req.body.productName)
      req.body.slug = slugify(req.body.productName);
    const newProduct = await Product.create(req.body);
    await newProduct.save();

    const warehousingData = {
      productId: newProduct._id,
      quantity: req.body.quantity || 0,
    };

    await Warehousing.create(warehousingData);

    return res.status(200).json({
      success: true,
      message: message.PRODUCT_SUCCESS,
      retObj: newProduct,
    });
  } catch (error) {
    console.log("errors", error);
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

// GET theo id sản phẩm

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { pid } = req.params;

    const activePricelist = await Pricelist.findOne({
      isActive: true,
      applyDate: { $lte: new Date() },
    }).sort({ applyDate: -1 });

    if (!activePricelist) {
      throw new Error("Không có bảng giá hoạt động nào");
    }

    const product = await Product.findById(pid);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    const warehouseEntry = await Warehousing.findOne({ productId: pid });

    const priceEntry = await ProductPrice.findOne({
      productId: pid,
      pricelistId: activePricelist._id,
    });

    const productWithDetails = {
      ...product.toObject(),
      quantity: warehouseEntry ? warehouseEntry.quantity : 0,
      price: priceEntry ? priceEntry.price : 0,
    };

    res.json({ success: true, data: productWithDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const activePricelist = await Pricelist.findOne({
      isActive: true,
      applyDate: { $lte: new Date() },
    }).sort({ applyDate: -1 });

    if (!activePricelist) {
      throw new Error("Không có bảng giá hoạt động nào");
    }

    const products = await Product.find().populate({
      path: "category",
      select: "categoryName",
    });

    const productIds = products.map((product) => product._id);

    const quantities = await Warehousing.aggregate([
      {
        $match: { productId: { $in: productIds } },
      },
      {
        $group: {
          _id: "$productId",
          quantity: { $sum: "$quantity" },
        },
      },
    ]);

    const prices = await ProductPrice.aggregate([
      {
        $match: {
          productId: { $in: productIds },
          pricelistId: activePricelist._id,
        },
      },
      {
        $group: {
          _id: "$productId",
          price: { $first: "$price" },
        },
      },
    ]);

    const productsWithDetails = products.map((product) => {
      const quantityObj = quantities.find((q) => q._id.equals(product._id));
      const priceObj = prices.find((p) => p._id.equals(product._id));
      const quantity = quantityObj ? quantityObj.quantity : 0;
      const price = priceObj ? priceObj.price : 0;

      return {
        ...product.toObject(),
        quantity,
        price,
      };
    });

    res.json({ success: true, retObj: productsWithDetails });
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error.message);
    res.status(500).json({ error: "Lỗi khi lấy thông tin sản phẩm" });
  }
});

// const getProductbyCategory = asyncHandler(async (req, res) => {
//   const categoryId = req.params.categoryId;

//   try {
//     let products;
//     if (categoryId === "all") {
//       // Lấy tất cả sản phẩm khi categoryId là "all"
//       products = await Product.find({ isActive: true })
//         .populate({
//           path: "category",
//           select: "categoryName",
//         })
//         .exec();
//     } else {
//       // Lấy sản phẩm theo categoryId khi categoryId không phải là "all"
//       products = await Product.find({
//         category: categoryId,
//         isActive: true,
//       })
//         .populate({
//           path: "category",
//           select: "categoryName",
//         })
//         .exec();
//     }

//     res.json({ success: true, retObj: products });
//   } catch (error) {
//     console.error(
//       "Lỗi khi lấy thông tin sản phẩm theo danh mục:",
//       error.message
//     );
//     res
//       .status(500)
//       .json({ error: "Lỗi khi lấy thông tin sản phẩm theo danh mục" });
//   }
// });
const getProductbyCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    let products;
    if (categoryId === "all") {
      // Lấy tất cả sản phẩm khi categoryId là "all"
      products = await Product.find({ isActive: true })
        .populate({
          path: "category",
          select: "categoryName",
        })
        .exec();
    } else {
      // Lấy sản phẩm theo categoryId khi categoryId không phải là "all"
      products = await Product.find({
        category: categoryId,
        isActive: true,
      })
        .populate({
          path: "category",
          select: "categoryName",
        })
        .exec();
    }

    const productIds = products.map((product) => product._id);

    const quantities = await Warehousing.aggregate([
      {
        $match: { productId: { $in: productIds } },
      },
      {
        $group: {
          _id: "$productId",
          quantity: { $sum: "$quantity" },
        },
      },
    ]);

    const activePricelist = await Pricelist.findOne({
      isActive: true,
      applyDate: { $lte: new Date() },
    }).sort({ applyDate: -1 });

    const prices = await ProductPrice.aggregate([
      {
        $match: {
          productId: { $in: productIds },
          pricelistId: activePricelist._id,
        },
      },
      {
        $group: {
          _id: "$productId",
          price: { $first: "$price" },
        },
      },
    ]);

    const productsWithDetails = products.map((product) => {
      const quantityObj = quantities.find((q) => q._id.equals(product._id));
      const priceObj = prices.find((p) => p._id.equals(product._id));
      const quantity = quantityObj ? quantityObj.quantity : 0;
      const price = priceObj ? priceObj.price : 0;

      return {
        ...product.toObject(),
        quantity,
        price,
      };
    });

    res.json({ success: true, retObj: productsWithDetails });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Lỗi khi lấy thông tin sản phẩm theo danh mục" });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const errors = { productError: String };
    const { productId, productName } = req.body;

    if (!productId) {
      errors.productError = "Thiếu thông tin productId";
      return res.status(400).json(errors);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ productError: "Sản phẩm không tồn tại" });
    }

    if (productName && productName !== product.productName) {
      const existingProduct = await Product.findOne({
        productName: productName,
      });

      if (existingProduct) {
        return res
          .status(400)
          .json({ productError: "Tên sản phẩm này đã tồn tại" });
      }
    }

    if (productName) {
      req.body.slug = slugify(productName);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      updatedProduct,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const products = req.body;
    const errors = { productError: String };

    for (let i = 0; i < products.length; i++) {
      const productId = products[i];

      const productInCart = await Cart.findOne({ productId: productId });
      const productInOrder = await Order.findOne({
        "productItems.productId": productId,
        $or: [
          { status: "pending" },
          { status: "shipped" },
          { status: "delivered" },
        ],
      });

      if (productInCart || productInOrder) {
        return res.status(400).json({
          productError:
            "Không thể xóa sản phẩm đã có trong giỏ hàng hoặc đơn hàng",
        });
      }
      await ProductPrice.deleteMany({ productId: productId });
      await Product.findByIdAndDelete(productId);
      await Warehousing.findOneAndDelete({ productId: productId });
    }

    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (error) {
    console.log("error", error);
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductbyCategory,
};
