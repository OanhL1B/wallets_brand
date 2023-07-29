import { APIPUBLIC } from "../config/config";

export const userLogin = (formData) =>
  APIPUBLIC.post("api/user/login", formData);
export const addUser = (user) => APIPUBLIC.post("/api/user/register", user);
