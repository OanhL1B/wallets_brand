const router = require("express").Router();
const ctrls = require("../controllers/product");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

// cả admin và nhân viên đều có quyền đối với sản phẩm nha

router.post("/", [verifyAccessToken, isAdminOrEmployee], ctrls.createProduct);
router.get("/", ctrls.getProducts);

router.put("/", [verifyAccessToken, isAdminOrEmployee], ctrls.updateProduct);
router.delete(
  "/:pid",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.deleteProduct
);
router.get("/:pid", ctrls.getProduct);

module.exports = router;
