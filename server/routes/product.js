const router = require("express").Router();
const ctrls = require("../controllers/product");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdminOrEmployee], ctrls.createProduct);
router.get("/", ctrls.getProducts);

router.put("/", [verifyAccessToken, isAdminOrEmployee], ctrls.updateProduct);
router.delete("/", [verifyAccessToken, isAdminOrEmployee], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);
router.get("/category/:categoryId", ctrls.getProductbyCategory);

module.exports = router;
