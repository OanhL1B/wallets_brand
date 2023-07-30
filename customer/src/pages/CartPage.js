import React from "react";

import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteCartProduct,
//   getUserCart,
//   updateCartProduct,
// } from "../features/user/userSlice";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCartUser } from "../redux/actions";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userCarts = useSelector((state) => state.customer?.userCarts);
  console.log("userCarts", userCarts);
  useEffect(() => {
    dispatch(getCartUser(user?.userData?._id));
  }, []);

  //   useEffect(() => {
  //     if (productUpdateDetail !== null) {
  //       dispatch(
  //         updateCartProduct({
  //           cartItemId: productUpdateDetail?.cartItemId,
  //           quantity: productUpdateDetail?.quantity,
  //         })
  //       );
  //       setTimeout(() => {
  //         dispatch(getUserCart());
  //       }, 200);
  //     }
  //   }, [productUpdateDetail]);

  //   const deleteACartProduct = (id) => {
  //     dispatch(deleteCartProduct(id));
  //     setTimeout(() => {
  //       dispatch(getUserCart());
  //     }, 200);
  //   };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCarts?.length; index++) {
      sum = sum + Number(userCarts[index].quantity) * userCarts[index].price;
      setTotalAmount(sum);
    }
  }, [userCarts]);

  return (
    <div className="bg-gray-100">
      <Header />
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
      <div className="py-2 mt-4 col-12 ">
        <div className="d-flex justify-content-between align-items-baseline">
          {totalAmount !== null && totalAmount !== 0 && (
            <div className="flex flex-col items-end mr-36">
              <h4 className="text-4xl">Tổng tiền: {totalAmount}đ</h4>
              <Link to="/checkout" className="button">
                <button className="px-5 py-3 mt-2 text-white bg-red-600 rounded-lg">
                  Thanh toán
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
