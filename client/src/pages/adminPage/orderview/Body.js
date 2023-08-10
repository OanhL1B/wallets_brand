import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { APIV1 } from "../../../redux/config/config";
import { MenuItem, Select } from "@mui/material";
import * as classes from "../../../utils/styles";
import { updateOrderStatus } from "../../../redux/actions/adminActions";

const Body = () => {
  //

  const orderId = useParams();
  const { id } = orderId;
  const [order, setOrder] = useState({});
  const [statusE, setStatusE] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await APIV1.get("api/order/" + id);
        console.log("res", res?.data?.retObj);
        setOrder(res?.data?.retObj);
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
          <button
            className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            Back
          </button>
        </Link>
      </div>
      <div className="px-8 py-6 border border-[#c7c2c2] bg-white">
        {/* <h2 className="mb-4 text-2xl font-bold">Order #{order._id}</h2> */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold">Full Name:</p>
            <p>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</p>
          </div>
          <div className="flex p-8 gap-x-5 ">
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Update Status:</h1>
              <Select
                required
                displayEmpty
                placeholder={order.status}
                sx={{ height: 36 }}
                inputProps={{ "aria-label": "Without label" }}
                value={order.status}
                onChange={(e) => setStatusE(e.target.value)}
                className={`${classes.InputStyle} hover:focus:border-none `}
              >
                <MenuItem value="pending" disabled>
                  Pending
                </MenuItem>
                {status === "delivered" || status === "canceled" ? (
                  <MenuItem value="shipped" disabled>
                    Shipped
                  </MenuItem>
                ) : (
                  <MenuItem value="shipped">Shipped</MenuItem>
                )}

                {status === "canceled" ? (
                  <MenuItem value="delivered" disabled>
                    Delivered
                  </MenuItem>
                ) : (
                  <MenuItem value="delivered">Delivered</MenuItem>
                )}
              </Select>
            </div>
            <div className="items-center justify-center my-auto">
              <button
                className="px-3.5 py-2 mt-2  font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                onClick={handleSetSattus}
              >
                save
              </button>
            </div>
          </div>
          <div>
            <p className="font-bold">Address:</p>
            <p>{shippingAddress?.address}</p>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-[#c7c2c2]">
                  Product Name
                </th>
                <th className="px-4 py-2 border border-[#c7c2c2]">Quantity</th>
                <th className="px-4 py-2 border border-[#c7c2c2]">Price</th>
                <th className="px-4 py-2 border border-[#c7c2c2]">
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              {productItems?.map((product, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 border border-[#c7c2c2]">
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

                  <td className="px-4 py-2 border border-[#c7c2c2]">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-2 border border-[#c7c2c2]">
                    {product.price}
                  </td>
                  <td className="px-4 py-2 border border-[#c7c2c2]">
                    {product.quantity * product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end mt-4">
          <div className="mr-4">
            <p className="font-bold">Total Bill:</p>
            <p>{total_price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;

//  <div className="mt-3 ml-3">
//     <Link to="/manage-orders" className="btn btn-primary">
//       <button
//         className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4
//          bg-[#157572] focus:outline-none focus:shadow-outline "
//       >
//         Back
//       </button>
//     </Link>
//     <div className="grid grid-cols-2">
//       <div class="p-8">
//         <h1 class="text-2xl font-semibold mb-4">Order Details</h1>
//         <div class="border rounded p-4">
//           <h2 class="text-xl font-semibold mb-2">Shipping Address</h2>
//           <p class="mb-1">
//             <span class="font-semibold">First Name:</span>{" "}
//             {order?.shippingAddress?.firstName}{" "}
//             {order?.shippingAddress?.lastName}
//           </p>

//           <p class="mb-1">
//             <span class="font-semibold">Address:</span>{" "}
//             {order?.shippingAddress?.address}
//           </p>
//         </div>

//         <div class="border rounded p-4 mt-4">
//           <h2 class="text-xl font-semibold mb-2">Order Details</h2>

//           <h3 class="text-lg font-semibold mt-4 mb-2">Product Items</h3>
//           {order?.productItems?.map((item, index) => (
//             <ul key={index}>
//               <li>
//                 <p class="mb-1">
//                   <span class="font-semibold">Product ID:</span>{" "}
//                   {item?.productId}
//                 </p>
//                 <p class="mb-1">
//                   <span class="font-semibold">Color:</span> {item?.color}
//                 </p>
//                 <p class="mb-1">
//                   <span class="font-semibold">Quantity:</span>{" "}
//                   {item?.quantity}
//                 </p>
//                 <p class="mb-1"></p>
//               </li>
//             </ul>
//           ))}
//           <p class="mt-4">
//             <span class="font-semibold">Total Price:</span>{" "}
//             {order?.total_price}
//           </p>
//           <p class="mb-1">
//             <span class="font-semibold">Status:</span> {order?.status}
//           </p>
//         </div>
//       </div>
//       <div className="p-8 ">
//         <h1 className="mb-4 text-2xl font-semibold">Update Status</h1>
//         <div className={classes.WrapInputLabel}>
//           <h1 className={classes.LabelStyle}>Status *:</h1>
//           <Select
//             required
//             displayEmpty
//             placeholder={order.status}
//             sx={{ height: 36 }}
//             inputProps={{ "aria-label": "Without label" }}
//             value={order.status}
//             onChange={(e) => setStatus(e.target.value)}
//             className={`${classes.InputStyle} hover:focus:border-none `}
//           >
//             <MenuItem value="pending" disabled>
//               Pending
//             </MenuItem>
//             <MenuItem value="shipped">Shipped</MenuItem>
//             <MenuItem value="delivered">Delivered</MenuItem>
//           </Select>
//         </div>
//         <button
//           className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
//           onClick={handleSetSattus}
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   </div>
