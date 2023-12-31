const router = require("express").Router();
const ctrls = require("../controllers/order");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

router.post("/online", [verifyAccessToken], ctrls.createOrderPaymentOnline);
router.post("/cod", [verifyAccessToken], ctrls.createOrderPaymentCod);

router.get("/", [verifyAccessToken, isAdminOrEmployee], ctrls.getOrders);
router.get("/income", [verifyAccessToken, isAdminOrEmployee], ctrls.Income);

router.get("/user/:userId", verifyAccessToken, ctrls.getOrdersByUser);
router.get("/:orderId", ctrls.getOrderById);
router.put(
  "/",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.updateOrderStatus
);
router.delete("/:orderId", [verifyAccessToken], ctrls.cancelOrder);
router.get(
  "/status/query",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.getOrderbyStatus
);

module.exports = router;
