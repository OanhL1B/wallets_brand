import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addOrderCod, addOrderOnline, getCartUser } from "../redux/actions";
import { useNavigate } from "react-router";
import StripeCheckout from "react-stripe-checkout";
import { ADD_ORDER_COD, ADD_ORDER_ONLINE } from "../redux/actionTypes";
import { APIV1 } from "../redux/config/config";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";
const KEY = process.env.REACT_APP_STRIPE;
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // test stripe
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      await APIV1.post("/api/payment", {
        tokenId: stripeToken.id,
        amount: totalAmount,
      });
      handleToken();
    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  //end test stripe
  const store = useSelector((state) => state);
  const userCarts = useSelector((state) => state.customer?.userCarts);
  const user = JSON.parse(localStorage.getItem("user"));
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCarts?.length; index++) {
      sum = sum + Number(userCarts[index].quantity) * userCarts[index].price;
      setTotalAmount(sum);
    }
  }, [userCarts]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < userCarts?.length; index++) {
      items.push({
        productId: userCarts[index]._id,
        quantity: userCarts[index].quantity,
        price: userCarts[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address ||
      !shippingInfo.phoneNumber
    ) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ giao hàng!");
      return;
    }

    const orderData = {
      userId: user?.userData?._id,
      productItems: cartProductState,
      shippingAddress: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        phoneNumber: shippingInfo.phoneNumber,
      },
      total_price: totalAmount,
    };

    dispatch(addOrderCod(orderData));
  };
  useEffect(() => {
    if (store.customer.orderCodAdded) {
      if (store.customer.orderCodAdded) {
        dispatch(getCartUser(user?.userData?._id));
        dispatch({ type: ADD_ORDER_COD, payload: false });
        navigate("/success");
      }
    } else {
    }
  }, [store.customer.orderCodAdded]);

  const handleToken = async () => {
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

    dispatch(addOrderOnline(orderData));
  };

  useEffect(() => {
    if (store.customer.orderOnlineAdded) {
      if (store.customer.orderOnlineAdded) {
        dispatch(getCartUser(user?.userData?._id));
        dispatch({ type: ADD_ORDER_ONLINE, payload: false });
        navigate("/success_online");
      }
    } else {
    }
  }, [store.customer.orderOnlineAdded]);
  return (
    <>
      <Header />
      <Title></Title>
      <IconCategory></IconCategory>
      <div className="mt-4 text-xl font-semibold text-center">
        Thông tin giao hàng
      </div>

      <div className="items-center justify-center w-full m-10 mx-auto">
        <form className="w-full max-w-md p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-text2 dark:text-text3"
              >
                Họ *
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    firstName: e.target.value,
                  })
                }
                value={shippingInfo.firstName}
                name="firstName"
                type="text"
                required
                className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 rounded-xl placeholder-text-text4 dark:placeholder-text-text2 dark:text-white"
                placeholder="Vũ Thị Hồng"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-text2 dark:text-text3"
              >
                Tên *
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                }
                value={shippingInfo.lastName}
                name="lastName"
                type="text"
                required
                className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 rounded-xl placeholder-text-text4 dark:placeholder-text-text2 dark:text-white"
                placeholder="Oanh"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-text2 dark:text-text3"
            >
              Địa chỉ giao hàng *
            </label>
            <input
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              value={shippingInfo.address}
              name="address"
              type="text"
              required
              className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 rounded-xl placeholder-text-text4 dark:placeholder-text-text2 dark:text-white"
              placeholder="97 Man Thiện"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-text2 dark:text-text3"
            >
              Số điện thoại nhận hàng *
            </label>
            <input
              onChange={(e) =>
                setShippingInfo({
                  ...shippingInfo,
                  phoneNumber: e.target.value,
                })
              }
              value={shippingInfo.phoneNumber}
              name="phoneNumber"
              type="text"
              required
              className="w-full px-4 py-2 text-sm font-medium bg-transparent border border-[#157572] focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40 rounded-xl placeholder-text-text4 dark:placeholder-text-text2 dark:text-white"
            />
          </div>
          <div className="text-text1 dark:text-darkStroke">
            Tổng tiền đơn hàng: {totalAmount}
          </div>
        </form>
        <div className="flex flex-col mt-2 text-center gap-x-2 gap-y-2">
          <div>
            <StripeCheckout
              token={onToken}
              stripeKey={KEY}
              amount={totalAmount}
              name="Camelia shop"
              description="Thanh toán đơn hàng"
            />
          </div>
          <div className="w-full" style={{ "text-align": "-webkit-center" }}>
            <button
              className="flex items-center text-center justify-center  px-3 py-2 text-base font-semibold text-white rounded-md bg-secondary min-h-[30px]"
              onClick={handleSubmitForm}
            >
              Thanh toán khi nhân hàng
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
