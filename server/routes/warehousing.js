const router = require("express").Router();
const ctrls = require("../controllers/warehousing");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

router.get("/", ctrls.getWarehousings);

router.put(
  "/",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.updateWarehousing
);

module.exports = router;
