import axios from "axios";

// api public
export const APIPUBLIC = axios.create({
  baseURL: "http://localhost:5000/",
});

// api admin
export const APIV1 = axios.create({ baseURL: "http://localhost:5000/api/" });

APIV1.interceptors.request.use((req) => {
  if (localStorage.getItem("adminUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("adminUser")).retObj.jwt
    }`;
  }
  return req;
});

// api employee
export const APIV2 = axios.create({ baseURL: "http://localhost:5000/api/" });
APIV2.interceptors.request.use((req) => {
  if (localStorage.getItem("adminUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("adminUser")).retObj.jwt
    }`;
  }
  return req;
});
