const userRouter = require("./user");
const productRouter = require("./product");
const categoryRouter = require("./category");
const pricelistRouter = require("./pricelist");
const productpriceRouter = require("./productprice");
const warehousingRouter = require("./warehousing");
const cartRouter = require("./cart");
const orderRouter = require("./order");

const { notFound, errHandler } = require("../middlewares/errHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/product", productRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/pricelist", pricelistRouter);
  app.use("/api/productprice", productpriceRouter);
  app.use("/api/warehousing", warehousingRouter);
  app.use("/api/order", orderRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
