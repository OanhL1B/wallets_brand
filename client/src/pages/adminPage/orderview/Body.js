import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { APIV1 } from "../../../redux/config/config";
import { MenuItem, Select } from "@mui/material";
import * as classes from "../../../utils/styles";
import { updateOrderStatus } from "../../../redux/actions/adminActions";

const Body = () => {
  const orderId = useParams();
  const { id } = orderId;
  const [order, setOrder] = useState({});
  const [statusOrder, setStatusOrder] = useState("");

  console.log("");
  const [statusE, setStatusE] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await APIV1.get("api/order/" + id);
        setOrder(res?.data?.retObj);
        setStatusOrder(res?.data?.retObj?.status);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleSetSattus = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus({ orderId: id, status: statusE }));
  };

  console.log("order", order);
  const { shippingAddress, productItems, total_price, status } = order;
  return (
    <div className="w-full my-8 mt-6 bg-bg_product">
      <div className="flex mx-4">
        <Link to="/manage-orders" className="btn btn-primary">
          <button className="mt-2 mb-2 px-4 py-2  font-bold text-white rounded bg-[#157572] mr-14 hover:bg-[#04605E] focus:outline-none focus:shadow-outline">
            Quay lại
          </button>
        </Link>
      </div>
      <div className="px-8 py-6 border border-[#c7c2c2] bg-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold">Full Name:</p>
            <p>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</p>
          </div>
          <div className="flex p-8 gap-x-5 ">
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Cập nhật trạng thái:</h1>
              <Select
                required
                displayEmpty
                placeholder={order.status}
                sx={{ height: 36, width: 200 }}
                inputProps={{ "aria-label": "Without label" }}
                value={statusE || statusOrder}
                onChange={(e) => setStatusE(e.target.value)}
                className={`${classes.InputStyle} hover:focus:border-none `}
              >
                <MenuItem value="pending" disabled>
                  Xác nhận đơn hàng
                </MenuItem>
                {status === "delivered" || status === "canceled" ? (
                  <MenuItem value="shipped" disabled>
                    Đang giao hàng
                  </MenuItem>
                ) : (
                  <MenuItem value="shipped">Đang giao hàng</MenuItem>
                )}

                {status === "canceled" ? (
                  <MenuItem value="delivered" disabled>
                    Đã giao hàng
                  </MenuItem>
                ) : (
                  <MenuItem value="delivered">Đã giao hàng</MenuItem>
                )}
              </Select>
            </div>
            <div className="items-center justify-center my-auto">
              <button
                className="px-3.5 py-2 mt-2  font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                onClick={handleSetSattus}
              >
                Lưu
              </button>
            </div>
          </div>
          <div>
            <p className="font-bold">Địa chỉ nhận hàng:</p>
            <p>{shippingAddress?.address}</p>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-[#c7c2c2] ">
                  Product Name
                </th>
                <th className="px-4 py-2 border border-[#c7c2c2] text-right">
                  Số lượng
                </th>
                <th className="px-4 py-2 border border-[#c7c2c2] text-right">
                  Giá
                </th>
                <th className="px-4 py-2 border border-[#c7c2c2] text-right">
                  Tổng giá
                </th>
              </tr>
            </thead>
            <tbody>
              {productItems?.map((product, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border border-[#c7c2c2] text-center">
                    <div className="flex items-center gap-4">
                      <img
                        src={product?.productId?.thumb}
                        alt="Product"
                        className="w-16 h-16"
                      />
                      <p className="font-bold">
                        {product?.productId?.productName}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-2 border border-[#c7c2c2] text-right">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-2 border border-[#c7c2c2] text-right">
                    {product.price}
                  </td>
                  <td className="px-4 py-2 border border-[#c7c2c2] text-right">
                    {product.quantity * product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end mt-4">
          <div className="mr-4">
            <p className="font-bold">Tổng đơn hàng:</p>
            <p>{total_price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;