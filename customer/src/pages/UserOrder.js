import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Canceled, getOrderUser } from "../redux/actions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { APIV1 } from "../redux/config/config";

const UserOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const store = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderUser(user?.userData?._id));
  }, []);

  const userOrders = useSelector((state) => state.customer?.userOrders);

  const handleCalceled = (orderId) => {
    Swal.fire({
      title: "Bạn xác nhận hủy đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(Canceled(orderId));
      }
    });
  };
  useEffect(() => {
    if (store.customer.deleteOrder) {
      dispatch(getOrderUser(user?.userData?._id));
    }
  }, [dispatch, store.errors, store.customer.deleteOrder]);

  return (
    <>
      <Header />
      <div className="w-full my-8 mt-6 bg-bg_product">
        {userOrders.length !== 0 && (
          <table className="w-[80%] items-center table-auto border border-[#c7c2c2] px-8 mx-auto bg-bg_product">
            <thead className="items-center h-20 px-8">
              <tr>
                <th className="px-4 py-1 border border-[#c7c2c2]">
                  Tên sản phẩm
                </th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Số lượng</th>
                <th className="px-4 py-1 border border-[#c7c2c2]">Đơn giá</th>
                <th className="px-4 py-1 border border-[#c7c2c2]">
                  Thành tiền
                </th>
                <th className="px-4 py-1 border border-[#c7c2c2]">
                  Trạng Thái
                </th>
              </tr>
            </thead>
            <tbody className="">
              {userOrders.map((order, idx) => (
                <tr className="justify-center item-center" key={idx}>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    <div className="flex flex-col items-center gap-2">
                      {order.productItems.map((product, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <img
                            src={product?.productId?.thumb}
                            alt="Product"
                            className="w-20 h-20"
                            style={{ width: "100px", height: "100px" }}
                          />
                          <span className="font-bold">
                            {product?.productId?.productName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.productItems.map((product, index) => (
                      <p key={index}>{product.quantity}</p>
                    ))}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.productItems.map((product, index) => (
                      <p key={index}>{product.price}</p>
                    ))}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.productItems.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.status === "pending" ? (
                      <select value={order.status}>
                        <option value="pending">Đang Xác Nhận</option>
                      </select>
                    ) : (
                      order.status
                    )}
                  </td>
                  <td className="px-4 py-1 text-center border border-[#c7c2c2]">
                    {order.status === "pending" && (
                      <button
                        className="px-4 py-2 text-white rounded bg-primary"
                        onClick={() => handleCalceled(order._id)}
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
};

export default UserOrder;
