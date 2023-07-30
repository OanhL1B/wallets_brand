import { APIPUBLIC, APIV1 } from "../config/config";

export const userLogin = (formData) =>
  APIPUBLIC.post("api/user/login", formData);
export const addUser = (user) => APIPUBLIC.post("/api/user/register", user);
export const addCart = (cart) => APIV1.post("/api/cart", cart);
export const addOrder = (order) => APIV1.post("/api/order", order);
export const getCartUser = (userId) => APIV1.get(`/api/cart/${userId}`);
