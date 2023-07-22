import { APIPUBLIC, APIV1 } from "../config/config";

export const userLogin = (formData) =>
  APIPUBLIC.post("api/user/login", formData);

// category
export const getCategories = () => APIV1.get("/api/category");
export const addCategory = (category) => APIV1.post("/api/category", category);
export const updateCategory = (updateCategory) =>
  APIV1.put("/api/category", updateCategory);
export const deleteCategory = (data) => APIV1.delete("api/category", { data });

// pricelist

export const getpricelists = () => APIV1.get("/api/pricelist");
export const addPriceList = (pricelist) =>
  APIV1.post("/api/pricelist", pricelist);
export const updatePriceList = (updatepricelist) =>
  APIV1.put("/api/pricelist", updatepricelist);

// product
export const getProducts = () => APIV1.get("/api/product");
export const addProduct = (product) => APIV1.post("/api/product", product);
export const updateProduct = (updateProduct) =>
  APIV1.put("/api/product", updateProduct);
export const deleteProduct = (data) => APIV1.delete("api/product", { data });

// productprice
export const getProductPrices = () => APIV1.get("/api/productprice");
export const addProductPrice = (product) =>
  APIV1.post("/api/productprice", product);
export const updateProductPrice = (updateProductPrice) =>
  APIV1.put("/api/productprice", updateProductPrice);
export const deleteProductPrice = (data) =>
  APIV1.delete("api/productprice", { data });

// users
