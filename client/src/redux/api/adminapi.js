import { APIPUBLIC, APIV1 } from "../config/config";

export const userLogin = (formData) =>
  APIPUBLIC.post("api/user/login", formData);

// category
export const getCategories = () => APIV1.get("/api/category");
export const addCategory = (category) => APIV1.post("/api/category", category);
export const updateCategory = (updateCategory) =>
  APIV1.put("/api/category", updateCategory);
export const deleteCategory = (data) => APIV1.delete("api/category", { data });
