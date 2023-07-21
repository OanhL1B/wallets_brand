const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

// xong được api thêm sản phẩm

const createProduct = asyncHandler(async (req, res) => {
  try {
    const errors = { productError: String };
    const { productName } = req.body;
    const existingProduct = await Product.findOne({ productName });
    if (existingProduct) {
      errors.productError = "Danh mục này đã tồn tại";
      return res.status(400).json(errors);
    }
    if (req.body && req.body.productName)
      req.body.slug = slugify(req.body.productName);
    const newProduct = await Product.create(req.body);
    await newProduct.save();
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

// const createProduct = asyncHandler(async (req, res) => {

//   if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
//   const { productName } = req.body;
//   const existingCategory = await Category.findOne({ productName });
//   if (existingCategory) {
//     errors.categoryError = "Danh mục này đã tồn tại";
//     return res.status(400).json(errors);
//   }
//   if (req.body && req.body.productName)
//     req.body.slug = slugify(req.body.productName);

//   const newProduct = await Product.create(req.body);
//   return res.status(200).json({
//     success: newProduct ? true : false,
//     createdProduct: newProduct ? newProduct : "Cannot create new product",
//   });
// });

// GET theo id sản phẩm
const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});

// get all sản phẩm
// Filtering, sorting & pagination
// const getProducts = asyncHandler(async (req, res) => {
//   const queries = { ...req.query }; // kiểu dữ liệu tham chiếu
//   // tách các trường đặt biệt ra khỏi query
//   const excludeFields = ["limit", "sort", "page", "fields"];
//   excludeFields.forEach((el) => delete queries[el]);

//   // Fortmat lại các operatoers cho đúng cú pháp của mongoose
//   let queryString = JSON.stringify(queries);
//   queryString = queryString.replace(
//     /\b(gte|gt|lte|lt)\b/g,
//     (macthedEl) => `$${macthedEl}`
//   );

//   const formatedQueries = JSON.parse(queryString);
//   //Filtering
//   if (queries?.productName)
//     formatedQueries.productName = {
//       $regex: queries.productName,
//       $option: "i",
//     };
//   let queryCommand = Product.find(formatedQueries);

//   // excute query
//   // số lượng sản phẩm thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi api
//   queryCommand.exec(async (err, response) => {
//     if (err) {
//       throw new Error(err.message);
//     }
//     const counts = await Product.find(formatedQueries).countDocuments();
//     return res.status(200).json({
//       success: response ? true : false,
//       products: response ? response : "Cannot get products",
//       counts,
//     });
//   });

// });
const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query }; // kiểu dữ liệu tham chiếu
  // tách các trường đặt biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Fortmat lại các operatoers cho đúng cú pháp của mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (macthedEl) => `$${macthedEl}`
  );

  const formatedQueries = JSON.parse(queryString);
  //Filtering
  if (queries?.productName)
    formatedQueries.productName = {
      $regex: queries.productName,
      $options: "i",
    };
  let queryCommand = Product.find(formatedQueries);
  //Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   query = query.sort(sortBy);
  // } else {
  //   query = query.sort("-createdAt");
  // }
  // excute query
  // số lượng sản phẩm thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi api
  try {
    const response = await queryCommand.exec(); // use await here
    const counts = await Product.find(formatedQueries).countDocuments(); // use await here
    return res.status(200).json({
      success: response ? true : false,
      products: response ? response : "Cannot get products",
      counts,
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
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

// //Sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(",").join(" ");
//   query = query.sort(sortBy);
// } else {
//   query = query.sort("-createdAt");
// }

// //Limiting
// if (req.query.fields) {
//   const fields = req.query.fields.split(",").join(" ");
//   query = query.select(fields);
// } else {
//   query = query.select("-__v");
// }

// //Pagination

// const page = req.query.page;
// const limit = req.query.limit;
// const skip = (page - 1) * limit;
// query = query.skip().limit(limit);
// if (req.query.page) {
//   const productCount = await Product.countDocuments();
//   if (skip >= productCount) throw new Error("This Page does not exists");
// }
// console.log(page, limit, skip);

// const product = await query;
// res.json(product);
// const getallProduct = await Product.find(queryObj);
// res.json(getallProduct);
