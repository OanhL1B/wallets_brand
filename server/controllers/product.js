const Product = require("../models/product");
const Warehousing = require("../models/warehousing");
const ProductPrice = require("../models/productprice");
const Pricelist = require("../models/pricelist");
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

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { pid } = req.params;

    // Retrieve the product
    const product = await Product.findById(pid);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    // Retrieve the quantity from the warehouse
    const warehouseEntry = await Warehousing.findOne({ productId: pid });

    // Retrieve the price from the productprice collection
    const priceEntry = await ProductPrice.findOne({ productId: pid });

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

//

const getProducts = asyncHandler(async (req, res) => {
  try {
    // Find the active Pricelist
    const activePricelist = await Pricelist.findOne({ isActive: true });
    console.log("activePricelist", activePricelist);
    if (!activePricelist) {
      throw new Error("Active Pricelist not found");
    }

    // Get the list of products
    const products = await Product.find();

    // Get productIds from the list of products
    const productIds = products.map((product) => product._id);

    // Get quantities from Warehousing based on productIds
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

    // Get prices from Productprice based on activePricelistId and productIds
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

    console.log("prices", prices);

    // Combine quantities and prices into the list of products
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

    // Send the result as JSON response
    res.json({ success: true, retObj: productsWithDetails });
  } catch (error) {
    console.error("Error retrieving products with details:", error.message);
    res.status(500).json({ error: "Error retrieving products with details" });
  }
});

// const getProducts = asyncHandler(async (req, res) => {
//   try {
//     const products = await Product.find();

//     const productIds = products.map((product) => product._id);

//     const quantities = await Warehousing.aggregate([
//       {
//         $match: { productId: { $in: productIds } },
//       },
//       {
//         $group: {
//           _id: "$productId",
//           quantity: { $sum: "$quantity" },
//         },
//       },
//     ]);

//     const prices = await ProductPrice.aggregate([
//       {
//         $match: { productId: { $in: productIds } },
//       },
//       {
//         $group: {
//           _id: "$productId",
//           price: { $first: "$price" }, // Assuming 'price' is the same for a specific product across different pricelists
//         },
//       },
//     ]);
//     const productsWithDetails = products.map((product) => {
//       const quantityObj = quantities.find((q) => q._id.equals(product._id));
//       const priceObj = prices.find((p) => p._id.equals(product._id));
//       const quantity = quantityObj ? quantityObj.quantity : 0;
//       const price = priceObj ? priceObj.price : 0;

//       return {
//         ...product.toObject(),
//         quantity,
//         price,
//       };
//     });

//     res.json({ success: true, retObj: productsWithDetails });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });

// const updateProduct = asyncHandler(async (req, res) => {
//   const { pid } = req.params;
//   if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
//   const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
//     new: true,
//   });
//   return res.status(200).json({
//     success: updatedProduct ? true : false,
//     updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
//   });
// });

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
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deletedProduct : "Cannot delete product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
