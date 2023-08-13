const Product = require("../models/product");
const Warehousing = require("../models/warehousing");
const ProductPrice = require("../models/productprice");
const Pricelist = require("../models/pricelist");
const Cart = require("../models/cart");
const Order = require("../models/order");

const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// xong được api thêm sản phẩm

const createProduct = asyncHandler(async (req, res) => {
  try {
    const errors = { productError: String };
    const { productName } = req.body;
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      errors.productError = "Sản phẩm này đã này đã tồn tại";
      return res.status(400).json(errors);
    }
    if (req.body && req.body.productName)
      req.body.slug = slugify(req.body.productName);
    const newProduct = await Product.create(req.body);
    await newProduct.save();

    const warehousingData = {
      productId: newProduct._id,
      productName: newProduct.productName,
      quantity: req.body.quantity || 0,
    };

    await Warehousing.create(warehousingData);

    return res.status(200).json({
      success: true,
      message: "Thêm mới sản phẩm  thành công!",
      retObj: newProduct,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

// GET theo id sản phẩm

// const getProduct = asyncHandler(async (req, res) => {
//   try {
//     const { pid } = req.params;

//     const product = await Product.findById(pid);

//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, error: "Product not found" });
//     }

//     const warehouseEntry = await Warehousing.findOne({ productId: pid });

//     const priceEntry = await ProductPrice.findOne({ productId: pid });

//     const productWithDetails = {
//       ...product.toObject(),
//       quantity: warehouseEntry ? warehouseEntry.quantity : 0,
//       price: priceEntry ? priceEntry.price : 0,
//     };

//     res.json({ success: true, data: productWithDetails });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

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

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const errors = { productError: String };
    const { productId, title } = req.body;

    if (!productId) {
      errors.productError = "Thiếu thông tin productId";
      return res.status(400).json(errors);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ productError: "Sản phẩm không tồn tại" });
    }

    if (title) {
      req.body.slug = slugify(title);
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

      await Product.findByIdAndDelete(productId);
    }

    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (error) {
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
};
