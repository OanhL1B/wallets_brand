const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { userId, productId, quantity, price, color } = req.body;
    const newCartItem = await new Cart({
      userId,
      productId,
      quantity,
      price,
      color,
    });
    await newCartItem.save();

    res.status(200).json({
      success: true,
      message: "Product added to the cart successfully!",
      retObj: newCartItem,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

// get theo user
const getCartItems = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const cartItems = await Cart.find({ userId });
    res.status(200).json({ success: true, retObj: cartItems });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated successfully",
      retObj: cartItem,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    await cartItem.remove();

    res.status(200).json({
      success: true,
      message: "Product removed from the cart successfully",
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

// xóa hết giỏ hàng
const clearCart = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

module.exports = {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
};
