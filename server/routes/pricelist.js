const router = require("express").Router();
const ctrls = require("../controllers/pricelist");
const {
  verifyAccessToken,
  isAdminOrEmployee,
} = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdminOrEmployee], ctrls.createPricelist);
router.get("/", ctrls.getPricelists);

router.put("/", [verifyAccessToken, isAdminOrEmployee], ctrls.updatePricelist);
router.delete(
  "/:plid",
  [verifyAccessToken, isAdminOrEmployee],
  ctrls.deletePricelist
);
router.get("/:plid", ctrls.getPricelist);

module.exports = router;
