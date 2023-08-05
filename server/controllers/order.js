const Order = require("../models/order");
const Cart = require("../models/cart");
const Warehousing = require("../models/warehousing");

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

//     for (const item of productItems) {
//       const { productId, quantity } = item;
//       const warehousingProduct = await Warehousing.findOne({ productId });

//       if (warehousingProduct) {
//         const updatedQuantity = warehousingProduct.quantity - quantity;

//         warehousingProduct.quantity = updatedQuantity;
//         await warehousingProduct.save();
//       } else {
//         console.log(`Product with ID ${productId} not found in the warehouse.`);
//       }
//     }

//     await Cart.deleteMany({ userId });

//     res.status(200).json({
//       success: true,
//       message: "Order placed successfully!",
//       retObj: newOrder,
//     });
//   } catch (error) {
//     console.error("Error during order creation:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred during order creation.",
//       backendError: error.message,
//     });
//   }
// });

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { userId, productItems, shippingAddress, total_price } = req.body;

    // Step 1: Create the new order
    const newOrder = await new Order({
      userId,
      productItems,
      shippingAddress,
      total_price,
    });
    await newOrder.save();

    for (const item of productItems) {
      const { productId, quantity } = item;
      const warehousingProduct = await Warehousing.findOne({ productId });

      if (warehousingProduct) {
        const updatedQuantity = warehousingProduct.quantity - quantity;

        warehousingProduct.quantity = updatedQuantity;
        await warehousingProduct.save();
      } else {
        console.log(`Product with ID ${productId} not found in the warehouse.`);
      }
    }

    await Cart.deleteMany({ userId });

    res.status(200).json({
      success: true,
      message: "Order placed successfully!",
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
    const userOrders = await Order.find({ userId: userId }).populate({
      path: "productItems.productId",
      select: "productName thumb",
    });
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
    const order = await Order.findById(orderId).populate({
      path: "productItems.productId",
      select: "productName thumb",
    });
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

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Cannot cancel the order. Only orders in 'pending' status can be canceled.",
      });
    }

    for (const item of order.productItems) {
      const { productId, quantity } = item;
      const warehousingProduct = await Warehousing.findOne({ productId });

      if (warehousingProduct) {
        const updatedQuantity = warehousingProduct.quantity + quantity;

        warehousingProduct.quantity = updatedQuantity;
        await warehousingProduct.save();
      } else {
        console.log(`Product with ID ${productId} not found in the warehouse.`);
      }
    }

    order.status = "canceled";
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order canceled successfully!" });
  } catch (error) {
    console.error("Error while canceling order:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while canceling the order.",
      error: error.message,
    });
  }
};

// const cancelOrder = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found." });
//     }

//     if (order.status !== "pending") {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Cannot cancel the order. Only orders in 'pending' status can be canceled.",
//       });
//     }

//     for (const item of order.productItems) {
//       const { productId, quantity } = item;
//       const warehousingProduct = await Warehousing.findOne({ productId });

//       if (warehousingProduct) {
//         const updatedQuantity = warehousingProduct.quantity + quantity;

//         warehousingProduct.quantity = updatedQuantity;
//         await warehousingProduct.save();
//       } else {
//         console.log(`Product with ID ${productId} not found in the warehouse.`);
//       }
//     }

//     order.status = "canceled";
//     await order.save();

//     await Order.findByIdAndRemove(orderId);

//     res.status(200).json({
//       success: true,
//       message: "Order canceled and deleted successfully!",
//     });
//   } catch (error) {
//     console.error("Error while canceling order:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while canceling the order.",
//       error: error.message,
//     });
//   }
// };

const getOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate("userId");
    res.status(200).json({
      success: true,
      message: "Show all orders successfully",
      retObj: orders,
    });
  } catch (error) {
    console.log("Backend Error", error);
  }
});

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrders,
};
