import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductPrices,
  updateProductPrice,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import { SET_ERRORS, UPDATE_PRODUCT_PRICE } from "../../../redux/actionTypes";

const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const productprices = useSelector((state) => state.admin.allProductPrice);
  console.log("productprices", productprices);

  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductPrices());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Begin-edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState({
    productId: "",
    pricelistId: "",
    price: "",
    productpriceId: "",
  });
  const handleEditClick = (productprice) => {
    setSelectedProductPrice(productprice);
    setIsModalOpen(true);
    setValue({
      productId: productprice?.productId?._id,
      pricelistId: productprice?.pricelistId?._id,
      price: "",
      productpriceId: productprice._id,
    });
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.price !== "") {
      updatedValue.price = value.price;
    } else {
      updatedValue.price = selectedProductPrice.price;
    }
    if (value.productId !== "") {
      updatedValue.productId = value.productId;
    } else {
      updatedValue.productId = selectedProductPrice.productId;
    }
    if (value.pricelistId !== "") {
      updatedValue.pricelistId = value.pricelistId;
    } else {
      updatedValue.pricelistId = selectedProductPrice.pricelistId;
    }
    if (value.productpriceId !== "") {
      updatedValue.productpriceId = value.productpriceId;
    } else {
      updatedValue.productpriceId = selectedProductPrice.productpriceId;
    }
    dispatch(updateProductPrice({ ...selectedProductPrice, ...updatedValue }));
    dispatch({ type: UPDATE_PRODUCT_PRICE, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedProductPrice) {
      setError({});
      closeModal();
      dispatch(getProductPrices());
    }
  }, [dispatch, store.errors, store.admin.updatedProductPrice]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // Begin delete
  // const [checkedValue, setCheckedValue] = useState([]);

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   const isChecked = e.target.checked;
  //   setCheckedValue((prevState) =>
  //     isChecked
  //       ? [...prevState, value]
  //       : prevState.filter((item) => item !== value)
  //   );
  // };

  // const dltSubject = (e) => {
  //   Swal.fire({
  //     title: "Bạn có chắc chắn muốn xóa?",
  //     text: "Hành động này sẽ không thể hoàn tác!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Đồng ý, Xóa!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteDepartment(checkedValue));
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (store.admin.departmentDeleted) {
  //     setCheckedValue([]);
  //     dispatch(getAllDepartment());
  //     dispatch({ type: DELETE_DEPARTMENT, payload: false });
  //   }
  // }, [store.admin.departmentDeleted]);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <Link to="/add-product" className="btn btn-primary">
        <button
          className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
        >
          Thêm
        </button>
      </Link>
      <div className="w-full my-8 mt-6">
        {productprices?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">Product</th>
                <th className="px-4 py-1">ProductPrice</th>
                <th className="px-4 py-1">Price</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {productprices?.map((productprice, idx) => (
                <tr
                  className="justify-center item-center hover:bg-[#EEF5F5]"
                  key={idx}
                >
                  {/* <td className="px-4 py-1 border">
                    <input
                      onChange={handleInputChange}
                      checked={checkedValue.includes(dep.id)}
                      value={dep.id}
                      type="checkbox"
                      className="accent-[#157572]"
                    />
                  </td> */}
                  <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                  <td className="px-4 py-1 text-center border">
                    {productprice?.productId?.productName}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {productprice?.pricelistId?.pricelistName}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {productprice.price}
                  </td>
                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => handleEditClick(productprice)}
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
      {/* modal edit */}
      {selectedProductPrice ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-full min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className={classes.FormItem}>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Product :</h1>
                  <input
                    placeholder={selectedProductPrice?.productId?.productName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Price List :</h1>
                  <input
                    placeholder={
                      selectedProductPrice?.pricelistId?.pricelistName
                    }
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Price :</h1>
                  <input
                    placeholder={selectedProductPrice?.price}
                    className={classes.InputStyle}
                    type="text"
                    value={value.price}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>

                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={() => handleModalError()}
                >
                  Thoát
                </button>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};
export default Body;
