const router = require("express").Router();
const ctrls = require("../controllers/cart");
const { verifyAccessToken } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken], ctrls.addToCart);

router.get("/:userId", [verifyAccessToken], ctrls.getCartItems);

router.put("/", [verifyAccessToken], ctrls.updateCartItemQuantity);

router.delete("/:cartItemId", [verifyAccessToken], ctrls.removeFromCart);

router.delete("/clear/:userId", [verifyAccessToken], ctrls.clearCart);

module.exports = router;
