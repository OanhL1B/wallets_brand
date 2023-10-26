import axios from "axios";

export const APIPUBLIC = axios.create({
  baseURL: "http://localhost:5000/",
});

export const APIV1 = axios.create({
  baseURL: "http://localhost:5000/",
});

APIV1.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).accessToken
    }`;
  }
  return req;
});

// import axios from "axios";

// export const APIPUBLIC = axios.create({
//   baseURL: "https://lthdt-server.onrender.com/",
// });

// export const APIV1 = axios.create({
//   baseURL: "https://lthdt-server.onrender.com/",
// });

// APIV1.interceptors.request.use((req) => {
//   if (localStorage.getItem("user")) {
//     req.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("user")).accessToken
//     }`;
//   }
//   return req;
// });
