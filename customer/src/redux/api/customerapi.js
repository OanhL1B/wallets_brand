import { APIPUBLIC, APIV1 } from "../config/config";

//user
export const userLogin = (formData) =>
  APIPUBLIC.post("api/user/login", formData);
export const addUser = (user) => APIPUBLIC.post("/api/user/register", user);

// cart
export const addCart = (cart) => APIV1.post("/api/cart", cart);
export const getCartUser = (userId) => APIV1.get(`/api/cart/${userId}`);
export const updateCartQuantity = (data) => APIV1.put("/api/cart", data);

// order
export const addOrder = (order) => APIV1.post("/api/order", order);
export const getOrderUser = (userId) => APIV1.get(`/api/order/user/${userId}`);
