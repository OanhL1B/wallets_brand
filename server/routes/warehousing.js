const router = require("express").Router();
const ctrls = require("../controllers/warehousing");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

// cả admin và nhân viên đều có quyền đối với cập nhật kho

router.get("/", ctrls.getWarehousings);

router.put(
  "/:id",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.updateWarehousing
);

// router.get("/:id", ctrls.getCategory);

module.exports = router;
