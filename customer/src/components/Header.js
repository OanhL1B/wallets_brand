import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getCartUser } from "../redux/actions";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import axios from "axios";
const Header = ({ onCategoryFilter }) => {
  const handleCategoryClick = (event) => {
    const categoryId = event.target.getAttribute("data-categoryid");
    if (categoryId === "all") {
      onCategoryFilter(null);
    } else {
      onCategoryFilter(categoryId);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const quantity = useSelector((state) => state.customer?.userCarts);
  const store = useSelector((state) => state);
  const categories = useSelector((state) => state.customer.allCategory);
  const products = useSelector((state) => state.customer.allProduct);
  console.log("products", products);

  console.log("categories", categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartUser(user?.userData?._id));
  }, []);

  const navigate = useNavigate();
  const logout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      }
    });
  };

  // phục vụ phần lọc
  const [productfilters, setProductFilters] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product");
        setProductFilters(res.data.retObj);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const activeProductFilters = productfilters.filter((item) => item?.isActive);
  // handle search
  const [filteredList, setFilteredList] = new useState([]);
  const [searchValue, setSearchValue] = useState("");
  const filterBySearch = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    var updatedList = [...activeProductFilters];
    updatedList = updatedList.filter((item) => {
      return (
        item?.productName?.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  const Handlenavigate = (id) => {
    setSearchValue("");
    navigate(`/product/${id}`);
    setFilteredList([]);
  };

  return (
    <div>
      <div className="w-full h-[50px] bg-[#F5F5F5] text-[#666666] font-normal text-base fixed top-0 z-50 ">
        <div className="container flex items-center justify-between h-[40px] mx-auto px-36 pt-2">
          <Link to="/">
            <div>
              <p className="text-[#000]">Camelia Brand ®</p>
            </div>
          </Link>
          <div className="flex items-center gap-x-3">
            <div className="flex items-center text-black gap-x-1">
              <img
                src="https://theme.hstatic.net/1000365849/1000614631/14/dienthoaido.svg?v=144"
                alt=""
                className="w-3 h-3"
              />

              <span>0961319365</span>
            </div>
            <div className="flex items-center text-black gap-x-1">
              <img
                src="https://theme.hstatic.net/1000365849/1000614631/14/maildo.svg?v=144"
                alt=""
                className="w-3 h-3"
              />
              <span>thecameliavn@gmail.com</span>
            </div>

            <div className="relative">
              <div className="flex items-center px-2 py-1 space-x-2 bg-white border border-gray-300 rounded">
                <input
                  className="w-20 text-base bg-transparent border-none outline-none md:w-40"
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  onChange={filterBySearch}
                />
                <SearchIcon
                  className="text-gray-500"
                  style={{ fontSize: 20 }}
                />
              </div>

              {searchValue && (
                <div className="absolute left-0 bg-white border border-gray-300 rounded shadow top-10 max-h-[500px] overflow-y-auto w-[300px]">
                  <div className="flex flex-wrap p-4">
                    {filteredList.map((product) => (
                      <div key={product?._id}>
                        <div
                          className="flex items-center p-2 cursor-pointer"
                          onClick={() => Handlenavigate(product._id)}
                        >
                          <img
                            src={product?.thumb}
                            alt={product?.productName}
                            className="w-20 h-auto"
                          />
                          <div className="flex flex-col ml-2">
                            <div className="font-medium text-center">
                              {product?.productName}
                            </div>
                            <div className="text-center">{product?.price}đ</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div onClick={logout}>Đăng xuất</div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="hidden text-sm cursor-pointer md:block"
                  >
                    Đăng Nhập
                  </Link>

                  <Link
                    to="/sign-up"
                    className="hidden text-sm cursor-pointer md:block"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}

              <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                <div className="relative">
                  <Badge color="primary" showZero>
                    <AddShoppingCartIcon className="text-2xl" />
                  </Badge>
                  {quantity?.length > 0 && (
                    <div className="absolute bottom-3 left-4 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#d61c1f] rounded-full">
                      {quantity?.length}
                    </div>
                  )}
                </div>
              </Link>
              {user && (
                <Link
                  to="/user-order"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Đơn hàng
                </Link>
              )}
            </div>
            {user && (
              <div className="flex gap-x-2">
                <span className="text-xl font-semibold">
                  {user?.userData?.lastName} {user?.userData?.firstName}{" "}
                </span>
                <Link to={"/profile"}>
                  <div className="items-center">
                    <AccountCircleIcon />
                  </div>
                </Link>
              </div>
            )}
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
                <Link to="/">
                  <div className="mx-24 ">
                    <div>
                      <img
                        src="https://theme.hstatic.net/1000365849/1000614631/14/logo.png?v=144"
                        alt=""
                        width={150}
                      />
                    </div>
                  </div>
                </Link>
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
            data-categoryid={categories[0]?._id}
            onClick={(e) => handleCategoryClick(e)}
          />
        </div>
        <div className="flex px-10 border-l-2">
          <img
            src="https://theme.hstatic.net/1000365849/1000614631/14/viden.svg?v=144"
            alt=""
            width={86}
            height={60}
            data-categoryid={categories[1]?._id}
            onClick={(e) => handleCategoryClick(e)}
          />
        </div>
        <div className="flex px-10 border-l-2 border-r-2">
          <img
            src="https://theme.hstatic.net/1000365849/1000614631/14/tuixachden.svg?v=144"
            alt=""
            width={79}
            height={60}
            data-categoryid={categories[2]?._id}
            onClick={(e) => handleCategoryClick(e)}
          />
        </div>
        <div className="flex px-10">
          <img
            src="https://theme.hstatic.net/1000365849/1000614631/14/tuicheoden.svg?v=144"
            alt=""
            width={120}
            height={60}
            data-categoryid={categories[3]?._id}
            onClick={(e) => handleCategoryClick(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
