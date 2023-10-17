import axios from "axios";

// api public
export const APIPUBLIC = axios.create({
  baseURL: "https://lthdt-server.onrender.com/",
});

// api user
export const APIV1 = axios.create({
  baseURL: "https://lthdt-server.onrender.com/",
});

APIV1.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).accessToken
    }`;
  }
  return req;
});
