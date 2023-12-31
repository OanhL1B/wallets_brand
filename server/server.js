const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
dbConnect();
initRoutes(app);

app.listen(port, () => {
  console.log("Server running on the port: " + port);
});
