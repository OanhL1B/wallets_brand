const router = require("express").Router();
const ctrls = require("../controllers/stripe");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], ctrls.payment);

module.exports = router;
