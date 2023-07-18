import { APIPUBLIC } from "../config/config";

export const userLogin = (formData) =>
  APIPUBLIC.post("api/user/login", formData);
