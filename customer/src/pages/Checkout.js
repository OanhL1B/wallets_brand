import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { addOrder } from "../redux/actions";

const Checkout = () => {
  const dispatch = useDispatch();
  const userCarts = useSelector((state) => state.customer?.userCarts);
  console.log("userCarts", userCarts);

  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });
  const [cartProductState, setCartProductState] = useState([]);

  console.log("cartProductState", cartProductState);

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
        productId: userCarts[index].productId._id,
        quantity: userCarts[index].quantity,
        color: userCarts[index].color,
        price: userCarts[index].price,
      });
    }
    setCartProductState(items);
  }, []);

  const handleSubmitForm = (e) => {
    console.log("cartProductState", cartProductState);
    e.preventDefault();

    // Kiểm tra dữ liệu địa chỉ giao hàng đã nhập đủ hay chưa
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address
    ) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ giao hàng!");
      return;
    }

    // Tạo đối tượng đơn hàng để gửi lên server
    const orderData = {
      userId: "64c4bc56a18c2e7040161cf1",
      productItems: cartProductState,
      shippingAddress: {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
      },
      total_price: totalAmount,
    };

    dispatch(addOrder(orderData))
      .then((response) => {
        const { success, message, retObj } = response;
        if (success) {
          console.log("Đặt hàng thành công!");
        } else {
          console.error("Đặt hàng không thành công:", message);
        }
      })
      .catch((error) => {
        console.error("Đã có lỗi xảy ra:", error);
      });
  };
  return (
    <>
      <Header />
      <div>Địa chỉ giao hàng</div>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-center justify-center w-full space-y-6 duration-1000 bg-white"
      >
        <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
          <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
            Họ *
          </label>
          <div className="flex items-center w-full bg-white rounded-lg ">
            <input
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, firstName: e.target.value })
              }
              value={shippingInfo.firstName}
              name="ten"
              type="text"
              required
              className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
              placeholder="Vũ Thị Hồng"
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
          <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
            Tên *
          </label>
          <div className="flex items-center w-full bg-white rounded-lg ">
            <input
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, lastName: e.target.value })
              }
              value={shippingInfo.lastName}
              name="ten"
              type="text"
              required
              className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
              placeholder="Oanh"
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
          <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
            Địa chỉ giao hàng *
          </label>
          <div className="flex items-center w-full bg-white rounded-lg ">
            <input
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              value={shippingInfo.address}
              name="adress"
              type="text"
              required
              className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
              placeholder="97 Man Thiện"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center p-4 text-base font-semibold rounded-xl min-h-[56px] bg-secondary text-white w-full"
        >
          Địa chỉ giao hàng
        </button>
      </form>

      <div className="w-full my-8 mt-6 item-center bg-bg_product">
        {userCarts.length !== 0 && (
          <table className="w-[80%] items-center table-auto  border border-[#c7c2c2] px-8 mx-auto bg-bg_product">
            <thead className="items-center h-20 px-8">
              <tr>
                <th className="px-4 py-1 border border-[#c7c2c2]">
                  Thông tin chi tiết sản phẩm
                </th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Đơn giá</th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Số lượng</th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Tổng giá</th>
              </tr>
            </thead>
            <tbody className="">
              {userCarts.map((item, idx) => (
                <tr className="justify-center item-center" key={idx}>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    <div className="flex items-center justify-center mx-auto gap-x-6 ">
                      <div className="mr-4 w-30 h-30">
                        <img
                          src={item?.productId?.images?.thumb}
                          alt="Product"
                          className="w-30"
                          style={{ width: "300px" }}
                        />
                      </div>
                      <div className="justify-center ml-10 text-center items-centers">
                        <p className="font-bold">
                          {item?.productId?.productName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {item.price}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {item.quantity}
                  </td>
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </table>
        )}
      </div>
      <div>Tống tiền đơn hàng: {totalAmount}</div>
      <Footer />
    </>
  );
};

export default Checkout;
