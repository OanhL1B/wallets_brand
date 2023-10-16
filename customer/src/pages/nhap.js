import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrder,
  getCartUser,
  getCategories,
  getProducts,
} from "../redux/actions";
import { ADD_ORDER } from "../redux/actionTypes";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  const userCarts = useSelector((state) => state.customer?.userCarts);
  const totalAmount = userCarts.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const handleToken = async (token) => {
    // Gửi token và thông tin đơn hàng đến API để xử lý thanh toán
    const orderData = {
      userId: user?.userData?._id,
      productItems: userCarts.map((cartItem) => ({
        productId: cartItem._id,
        quantity: cartItem.quantity,
        price: cartItem.price,
      })),
      shippingAddress: shippingInfo,
      total_price: totalAmount,
      tokenId: token.id, // Gửi token id từ Stripe để xác nhận thanh toán
    };

    // Gọi API để xử lý thanh toán online
    // await dispatch(thuc hien action de xu ly thanh toan online, chẳng hạn addOrderOnline(orderData))
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address
    ) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ giao hàng!");
      return;
    }

    // Thanh toán khi nhận hàng - gửi thông tin đơn hàng đến API để xử lý
    const orderData = {
      userId: user?.userData?._id,
      productItems: userCarts.map((cartItem) => ({
        productId: cartItem._id,
        quantity: cartItem.quantity,
        price: cartItem.price,
      })),
      shippingAddress: shippingInfo,
      total_price: totalAmount,
    };

    // Gọi API để xử lý thanh toán khi nhận hàng
    // await dispatch(thuc hien action de xu ly thanh toan khi nhan hang, chẳng hạn addOrderCOD(orderData))
  };

  // Rest of your component code

  return (
    <>
      {/* Your existing form and UI elements */}

      {/* Thanh toán online */}
      <StripeCheckout
        token={handleToken} // Hàm xử lý token từ Stripe
        stripeKey="your-publishable-key" // Khóa công khai của Stripe
        amount={totalAmount * 100} // Số tiền cần thanh toán (cent)
        name="Tên Cửa Hàng"
        description="Mô tả đơn hàng"
      />

      {/* Thanh toán khi nhận hàng */}
      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white rounded-xl bg-secondary min-h-[56px]"
        onClick={handleSubmitForm}
      >
        Thanh toán khi nhận hàng
      </button>

      {/* Rest of your component code */}
    </>
  );
};

export default Checkout;
