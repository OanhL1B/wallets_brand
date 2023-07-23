// import SearchIcon from "@mui/icons-material/Search";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import Badge from "@mui/material/Badge";
// import React from "react";
// // import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   // const quantity = useSelector((state) => state.cart.quantity);
//   const quantity = 10;
// return (
//   <div className="div w-full bg-[#F5F5F5] text-[#666666] font-normal text-base border-1 border-[#f0ebeb] fixed z-50 py-2 mb-3">
// <div className="container flex items-center justify-between h-[40px] mx-auto px-36 ">
//   <div>
//     <p className="text-[#000]">Camelia Brand ®</p>
//   </div>
//   <div className="flex items-center gap-x-3">
//     <div className="flex items-center text-black gap-x-1">
//       <img
//         src="https://theme.hstatic.net/1000365849/1000614631/14/dienthoaido.svg?v=144"
//         alt=""
//         className="w-3 h-3"
//       />
//       <span>19001052</span>
//     </div>
//     <div className="flex items-center text-black gap-x-1">
//       <img
//         src="https://theme.hstatic.net/1000365849/1000614631/14/maildo.svg?v=144"
//         alt=""
//         className="w-3 h-3"
//       />
//       <span>thecameliavn@gmail.com</span>
//     </div>
//     <div className="flex items-center px-2 py-1 space-x-2 bg-white border border-gray-300 rounded">
//       <input
//         className="w-20 text-base bg-transparent border-none outline-none md:w-40"
//         type="text"
//         placeholder="Nhập tên sản phẩm..."
//       />
//       <SearchIcon className="text-gray-500" style={{ fontSize: 20 }} />
//     </div>
//     <div className="flex items-center space-x-4">
//       <Link
//         to="/register"
//         className="hidden text-sm cursor-pointer md:block"
//       >
//         Đăng Nhập
//       </Link>
//       <Link
//         to="/signin"
//         className="hidden text-sm cursor-pointer md:block"
//       >
//         Đăng ký
//       </Link>
//       <Link to="/cart" className="text-gray-600 hover:text-gray-900">
//         <div className="relative">
//           <Badge color="primary" showZero>
//             <AddShoppingCartIcon className="text-2xl" />
//           </Badge>
//           {quantity > 0 && (
//             <div className="absolute bottom-3 left-4 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#d61c1f] rounded-full">
//               {quantity}
//             </div>
//           )}
//         </div>
//       </Link>
//     </div>
//   </div>
// </div>
//     <div className="w-full h-full pt-3 bg-white">
//       <div className="flex flex-col items-center">
//         <div className="flex items-center text-center">
//           <div className="ml-16 ">ABOUT US</div>
//           <div className="ml-16 ">ADDRESS</div>
//           <div className="mx-16 ">
//             <div>
//               <img
//                 src="https://theme.hstatic.net/1000365849/1000614631/14/logo.png?v=144"
//                 alt=""
//                 width={150}
//               />
//             </div>
//           </div>
//           <div className="mr-16">BLOG</div>
//           <div className="mr-16">MEMBERSHIP</div>
//         </div>
//         <div>ALWKC</div>
//       </div>
//     </div>
//   </div>
// );
// };

// export default Navbar;

import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  // const quantity = useSelector((state) => state.cart.quantity);
  const quantity = 10;
  return (
    <div>
      <div className="w-full h-[50px] bg-[#F5F5F5] text-[#666666] font-normal text-base fixed top-0 z-50 ">
        <div className="container flex items-center justify-between h-[40px] mx-auto px-36 pt-2">
          <div>
            <p className="text-[#000]">Camelia Brand ®</p>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="flex items-center text-black gap-x-1">
              <img
                src="https://theme.hstatic.net/1000365849/1000614631/14/dienthoaido.svg?v=144"
                alt=""
                className="w-3 h-3"
              />
              <span>19001052</span>
            </div>
            <div className="flex items-center text-black gap-x-1">
              <img
                src="https://theme.hstatic.net/1000365849/1000614631/14/maildo.svg?v=144"
                alt=""
                className="w-3 h-3"
              />
              <span>thecameliavn@gmail.com</span>
            </div>
            <div className="flex items-center px-2 py-1 space-x-2 bg-white border border-gray-300 rounded">
              <input
                className="w-20 text-base bg-transparent border-none outline-none md:w-40"
                type="text"
                placeholder="Nhập tên sản phẩm..."
              />
              <SearchIcon className="text-gray-500" style={{ fontSize: 20 }} />
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/register"
                className="hidden text-sm cursor-pointer md:block"
              >
                Đăng Nhập
              </Link>
              <Link
                to="/signin"
                className="hidden text-sm cursor-pointer md:block"
              >
                Đăng ký
              </Link>
              <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                <div className="relative">
                  <Badge color="primary" showZero>
                    <AddShoppingCartIcon className="text-2xl" />
                  </Badge>
                  {quantity > 0 && (
                    <div className="absolute bottom-3 left-4 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#d61c1f] rounded-full">
                      {quantity}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-[50px] mb-4 ">
        <div className="w-full bg-[#FFFFFF] text-[#000000] font-normal text-base p-2">
          <div className="w-full h-full pt-3 bg-white">
            <div className="flex flex-col items-center">
              <div className="flex items-center text-center">
                <div className="ml-24 ">ABOUT US</div>
                <div className="ml-24 ">ADDRESS</div>
                <div className="mx-24 ">
                  <div>
                    <img
                      src="https://theme.hstatic.net/1000365849/1000614631/14/logo.png?v=144"
                      alt=""
                      width={150}
                    />
                  </div>
                </div>
                <div className="mr-24">BLOG</div>
                <div className="mr-24">MEMBERSHIP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full h-full mb-3 border-b-2 ">
        <div className="flex px-10">
          <img
            src="https://theme.hstatic.net/1000365849/1000614631/14/baloden.svg?v=144"
            alt=""
            height={60}
            width={60}
          />
        </div>
        <div className="flex px-10 border-l-2">
          <img
            src="https://theme.hstatic.net/1000365849/1000614631/14/viden.svg?v=144"
            alt=""
            width={86}
            height={60}
          />
        </div>
        <div className="flex px-10 border-l-2 border-r-2">
          <img
            src="https://theme.hstatic.net/1000365849/1000614631/14/tuixachden.svg?v=144"
            alt=""
            width={79}
            height={60}
          />
        </div>
        <div className="flex px-10">
          <img
            src="https://theme.hstatic.net/1000365849/1000614631/14/tuicheoden.svg?v=144"
            alt=""
            width={120}
            height={60}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;