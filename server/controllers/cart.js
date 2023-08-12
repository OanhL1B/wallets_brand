const Cart = require("../models/cart");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;
    const newCartItem = await new Cart({
      userId,
      productId,
      quantity,
      price,
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

// const getCartItems = asyncHandler(async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const cartItems = await Cart.find({ userId }).populate("productId");

//     const groupedProducts = {};

//     cartItems.forEach((cartItem) => {
//       const { productId, quantity, price } = cartItem;
//       const productDetails = productId;

//       if (groupedProducts[productId._id]) {
//         groupedProducts[productId._id].quantity += quantity;
//         groupedProducts[productId._id].totalPrice += price * quantity;
//       } else {
//         groupedProducts[productId._id] = {
//           ...productDetails.toObject(),
//           quantity: quantity,
//           price: price,
//         };
//       }
//     });

//     const groupedProductArray = Object.values(groupedProducts);

//     res.status(200).json({ success: true, retObj: groupedProductArray });
//   } catch (error) {
//     const errors = { backendError: error.toString() };
//     res.status(500).json(errors);
//   }
// });
const getCartItems = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ userId }).populate("productId");

    const groupedProducts = {};

    cartItems.forEach((cartItem) => {
      const { _id: cartId, productId, quantity, price } = cartItem;
      const productDetails = productId;

      if (groupedProducts[productId._id]) {
        groupedProducts[productId._id].quantity += quantity;
        groupedProducts[productId._id].totalPrice += price * quantity;
      } else {
        groupedProducts[productId._id] = {
          cartId,
          ...productDetails.toObject(),
          quantity: quantity,
          price: price,
        };
      }
    });

    const groupedProductArray = Object.values(groupedProducts);

    res.status(200).json({ success: true, retObj: groupedProductArray });
  } catch (error) {
    const errors = { backendError: error.toString() };
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

// const removeFromCart = asyncHandler(async (req, res) => {
//   try {
//     const { cartItemId } = req.params;
//     const cartItem = await Cart.findById(cartItemId);
//     if (!cartItem) {
//       return res.status(404).json({ error: "Cart item not found" });
//     }
//     await cartItem.deleteOne(cartItemId);
//     res.status(200).json({
//       success: true,
//       message: "Product removed from the cart successfully",
//     });
//   } catch (error) {
//     console.log("error", error);
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// });

const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    await cartItem.deleteOne(); // Xóa bản ghi trong database
    res.status(200).json({
      success: true,
      message: "Product removed from the cart successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ backendError: "An error occurred on the backend" });
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
