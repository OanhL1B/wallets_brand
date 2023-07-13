const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const pricelistRouter = require("./pricelist");
const productpriceRouter = require("./productprice");

const { notFound, errHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/pricelist", pricelistRouter);
  app.use("/api/productprice", productpriceRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
