import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { deleteCart, getCartUser, updateCartQuantity } from "../redux/actions";
import { Link } from "react-router-dom";
import { DELETE_CART } from "../redux/actionTypes";

const Cart = () => {
  const store = useSelector((state) => state);

  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userCarts = useSelector((state) => state.customer?.userCarts);
  console.log("userCarts", userCarts);
  const [updatedQuantities, setUpdatedQuantities] = useState({});

  useEffect(() => {
    dispatch(getCartUser(user?.userData?._id));
  }, []);

  console.log("userCarts", userCarts);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCarts?.length; index++) {
      sum =
        sum +
        Number(
          updatedQuantities[userCarts[index]._id] || userCarts[index].quantity
        ) *
          userCarts[index].price;
    }
    setTotalAmount(sum);
  }, [userCarts, updatedQuantities]);

  const handleDelete = (id) => {
    dispatch(deleteCart(id));
  };

  useEffect(() => {
    if (store.errors || store.customer.deletedCart) {
      if (store.customer.deletedCart) {
        dispatch(getCartUser(user?.userData?._id));
        dispatch({ type: DELETE_CART, payload: false });
      }
    } else {
    }
  }, [store.errors, store.customer.deletedCart]);

  const handleUpdateQuantity = (cartItemId, quantity) => {
    setUpdatedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartItemId]: quantity,
    }));
  };

  useEffect(() => {
    for (const cartItemId in updatedQuantities) {
      const quantity = updatedQuantities[cartItemId];
      dispatch(
        updateCartQuantity({
          cartItemId,
          quantity,
        })
      );
    }
    setTimeout(() => {
      dispatch(getCartUser(user?.userData?._id));
    }, 200);
  }, [updatedQuantities]);

  return (
    <div className="bg-gray-100">
      <Header />
      {userCarts.length === 0 && (
        <div className="text-center">
          Giỏ hàng đang trống, cùng thêm vào giỏ hàng nào!{" "}
        </div>
      )}
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
                    <div className="flex items-center justify-center mx-auto gap-x-6">
                      <div className="mr-4 w-30 h-30">
                        <img
                          src={item?.thumb}
                          alt="Product"
                          className="w-30"
                          style={{ width: "300px" }}
                        />
                      </div>

                      <div className="justify-center ml-10 text-center items-centers">
                        <p className="font-bold">{item?.productName}</p>
                      </div>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(item.cartId)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {item.price}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    <div className="flex items-center gap-3 cart-col-3">
                      <div className="w-20">
                        <input
                          className="text-center"
                          type="number"
                          name=""
                          min={1}
                          max={10}
                          id=""
                          value={
                            updatedQuantities[item.cartId] !== undefined
                              ? updatedQuantities[item.cartId]
                              : item.quantity
                          }
                          onChange={(e) => {
                            handleUpdateQuantity(item.cartId, e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              <tr></tr>
            </tbody>
          </table>
        )}
      </div>
      {userCarts.length > 0 && (
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
      )}

      <Footer />
    </div>
  );
};

export default Cart;