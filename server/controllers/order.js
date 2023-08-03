const Order = require("../models/order");
const Cart = require("../models/cart");

const asyncHandler = require("express-async-handler");

// const createOrder = asyncHandler(async (req, res) => {
//   try {
//     const { userId, productItems, shippingAddress, total_price } = req.body;
//     const newOrder = await new Order({
//       userId,
//       productItems,
//       shippingAddress,
//       total_price,
//     });
//     await newOrder.save();

//     res.status(200).json({
//       success: true,
//       message: "Order placed successfully!",
//       retObj: newOrder,
//     });
//   } catch (error) {
//     const errors = { backendError: String };
//     errors.backendError = error;
//     res.status(500).json(errors);
//   }
// });

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { userId, productItems, shippingAddress, total_price } = req.body;
    const newOrder = await new Order({
      userId,
      productItems,
      shippingAddress,
      total_price,
    });
    await newOrder.save();

    // Remove cart items associated with the userId
    await Cart.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "Order placed successfully! Cart items removed.",
      retObj: newOrder,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);
    const userOrders = await Order.find({ userId: userId });
    console.log("userOrders", userOrders);
    res.status(200).json({ success: true, retObj: userOrders });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ success: true, retObj: order });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      retObj: order,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.remove();

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
});

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
