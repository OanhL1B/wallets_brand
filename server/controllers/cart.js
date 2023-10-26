const Cart = require("../models/cart");
const Pricelist = require("../models/pricelist");
const ProductPrice = require("../models/productprice");
const Warehousing = require("../models/warehousing");

const asyncHandler = require("express-async-handler");
const message = require("../constan/error");

const addToCart = asyncHandler(async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;

    const existingCartItem = await Cart.findOne({ userId, productId });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      res.status(200).json({
        success: true,
        message: message.CART_SUCCESS,
        retObj: existingCartItem,
      });
    } else {
      const warehousingItem = await Warehousing.findOne({ productId });
      const availableQuantity = warehousingItem ? warehousingItem.quantity : 0;

      if (quantity > availableQuantity) {
        return res.status(400).json({
          success: false,
          message: message.CART_QUANTITY_ERROR,
        });
      }

      const newCartItem = new Cart({
        userId,
        productId,
        quantity,
        price,
      });

      await newCartItem.save();

      res.status(200).json({
        success: true,
        message: message.CART_SUCCESS,
        retObj: newCartItem,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: message.CART_ERROR,
      error: error.message,
    });
  }
});

const getCartItems = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await Cart.find({ userId }).populate("productId");
    const activePricelist = await Pricelist.findOne({
      isActive: true,
      applyDate: { $lte: new Date() },
    }).sort({ applyDate: -1 });

    if (!activePricelist) {
      throw new Error("Không có bảng giá hoạt động nào");
    }

    const groupedProducts = {};

    for (const cartItem of cartItems) {
      const { _id: cartId, productId, quantity } = cartItem;
      const productDetails = productId;

      const productPrice = await ProductPrice.findOne({
        productId: productId._id,
        pricelistId: activePricelist._id,
      });

      if (!productPrice) {
        throw new Error("Không tìm thấy giá sản phẩm");
      }

      if (groupedProducts[productId._id]) {
        groupedProducts[productId._id].quantity += quantity;
      } else {
        groupedProducts[productId._id] = {
          cartId,
          ...productDetails.toObject(),
          quantity: quantity,
          price: productPrice.price,
        };
      }
    }

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
      return res.status(404).json({ error: message.CART_ITEM_NOTFOUND });
    }

    const warehousingItem = await Warehousing.findOne({
      productId: cartItem.productId,
    });
    const availableQuantity = warehousingItem ? warehousingItem.quantity : 0;

    if (quantity > availableQuantity) {
      return res.status(400).json({
        success: false,
        message: "Số lượng sản phẩm vượt quá số lượng có sẵn trong kho",
      });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: message.UPDATE_CART_SUCCESS,
      retObj: cartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã có lỗi xảy ra khi cập nhật mục giỏ hàng",
      error: error.message,
    });
  }
});

const removeFromCart = asyncHandler(async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: message.CART_ITEM_NOTFOUND });
    }
    await cartItem.deleteOne();
    res.status(200).json({
      success: true,
      message: message.REMOVE_CART_SUCCESS,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ backendError: message.ERROR });
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
