const router = require("express").Router();
const ctrls = require("../controllers/order");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

// cả admin và nhân viên đều có quyền đối với danh mục nha

router.post("/", [verifyAccessToken], ctrls.createOrder);
router.get("/", [verifyAccessToken, isAdminOrEmployee], ctrls.getOrders);

router.get("/user/:userId", verifyAccessToken, ctrls.getOrdersByUser);
router.get("/:orderId", ctrls.getOrderById);
router.put(
  "/",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.updateOrderStatus
);
router.delete("/:orderId", [verifyAccessToken], ctrls.cancelOrder);

module.exports = router;
