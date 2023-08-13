import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrders } from "../../../redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { SET_ERRORS } from "../../../redux/actionTypes";

import moment from "moment";

const Body = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.admin.allOrder);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4"></div>
      <div className="w-full my-8 mt-6">
        {orders?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1 text-center">STT</th>
                <th className="px-4 py-1 text-left">Trạng thái</th>
                <th className="px-4 py-1 text-left">Ngày tạo đơn</th>
                <th className="px-4 py-1 text-right">Tổng giá</th>
                <th className="px-4 py-1">Hàng động</th>
              </tr>
            </thead>
            <tbody className="">
              {orders?.map((user, idx) => (
                <tr className="justify-center  hover:bg-[#EEF5F5]" key={idx}>
                  <td className="items-center px-4 py-1 text-center border">
                    {idx + 1}
                  </td>

                  <td className="items-center px-4 py-1 border">
                    {user.status === "pending"
                      ? "Chờ xác nhận"
                      : user.status === "Shippped"
                      ? "Đang giao hàng"
                      : user.status === "delivered"
                      ? "Đã giao hàng"
                      : "Đã hủy"}
                  </td>
                  <td className="items-center px-4 py-1 border">
                    {moment(user?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="items-center px-4 py-1 text-right border">
                    {user.total_price}
                  </td>
                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => navigate(`/order/${user._id}`)}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default Body;