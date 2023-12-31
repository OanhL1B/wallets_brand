const router = require("express").Router();
const ctrls = require("../controllers/category");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdminOrEmployee], ctrls.createCategory);
router.get("/", ctrls.getCategories);

router.put("/", [verifyAccessToken, isAdminOrEmployee], ctrls.updateCategory);
router.delete(
  "/",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.deleteCategory
);
router.get("/:id", ctrls.getCategory);

module.exports = router;
