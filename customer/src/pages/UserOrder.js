import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderUser } from "../redux/actions";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderUser(user?.userData?._id));
  }, []);

  const userOrders = useSelector((state) => state.customer?.userOrders);
  console.log("userCarts", userOrders);

  return (
    <>
      <Header />
      <div>Đơn hàng của bạn</div>
      <div class1=" py-5">
        <div className="px-20 mx-auto mt-3">
          <div className="px-20 mx-auto mt-3">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="font-bold text-left">Mã hóa đơn</th>
                  <th className="font-bold text-left">Sản phẩm</th>

                  <th className="font-bold text-left">Tổng số tiền</th>

                  <th className="font-bold text-left">Trạng thái đơn hàng</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="py-3">{order._id}</td>

                    <td className="py-3">{order.total_price}</td>
                    <td className="py-3">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserOrder;
