const router = require("express").Router();
const ctrls = require("../controllers/category");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

// cả admin và nhân viên đều có quyền đối với danh mục nha

router.post("/", [verifyAccessToken, isAdminOrEmployee], ctrls.createCategory);
router.get("/", ctrls.getCategories);

router.put(
  "/:cid",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.updateCategory
);
router.delete(
  "/:cid",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.deleteCategory
);
router.get("/:cid", ctrls.getCategory);

module.exports = router;
