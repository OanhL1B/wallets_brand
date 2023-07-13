const router = require("express").Router();
const ctrls = require("../controllers/productprice");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

router.post(
  "/",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.createProductprice
);
router.get("/", ctrls.getProductprices);

router.put(
  "/:ppid",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.updateProductprice
);
router.delete(
  "/:ppid",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.deleteProductprice
);
router.get("/:ppid", ctrls.getProductprice);

module.exports = router;
