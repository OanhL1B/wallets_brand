import axios from "axios";

// api public
export const APIPUBLIC = axios.create({ baseURL: "http://localhost:9090/" });

// api admin
export const APIV1 = axios.create({ baseURL: "http://localhost:9090/" });

APIV1.interceptors.request.use((req) => {
  if (localStorage.getItem("adminUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("adminUser")).retObj.jwt
    }`;
  }
  return req;
});

// api employee
export const APIV2 = axios.create({ baseURL: "http://localhost:9090/" });
APIV2.interceptors.request.use((req) => {
  if (localStorage.getItem("adminUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("adminUser")).retObj.jwt
    }`;
  }
  return req;
});
