import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { getProductPrices } from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import { SET_ERRORS } from "../../../redux/actionTypes";

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
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [value, setValue] = useState({
  //     categoryName: "",
  //     id: "",
  //   });
  //   const handleEditClick = (cate) => {
  //     setSelectedCategory(cate);
  //     setIsModalOpen(true);
  //     setValue({
  //       categoryName: "",
  //       id: cate.id,
  //     });
  //   };
  //   const openModal = () => {
  //     setIsModalOpen(true);
  //   };
  //   const closeModal = () => {
  //     setIsModalOpen(false);
  //   };
  //   const handleFormSubmit = (e) => {
  //     e.preventDefault();
  //     const updatedValue = {};
  //     if (value.categoryName !== "") {
  //       updatedValue.categoryName = value.categoryName;
  //     } else {
  //       updatedValue.categoryName = selectedCategory.categoryName;
  //     }

  // dispatch(updateDepartment({ ...selectedDepartment, ...updatedValue }));
  // dispatch({ type: UPDATE_DEPARTMENT, payload: false });
  //   };

  // useEffect(() => {
  //   if (store.admin.updatedDepartment) {
  //     setError({});
  //     closeModal();
  //     dispatch(getAllDepartment());
  //   }
  // }, [dispatch, store.errors, store.admin.updatedDepartment]);

  //   const handleModalError = () => {
  //     setError({});
  //     closeModal();
  //   };
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
      <div className="w-full my-8 mt-6">
        {productprices?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1">Chọn</th>
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">Id ProductPrice</th>
                <th className="px-4 py-1">Id Product</th>
                <th className="px-4 py-1">Id PriceList</th>
                <th className="px-4 py-1">Product Name</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {productprices?.map((productprice, idx) => (
                <tr
                  className="justify-center item-center hover:bg-[#EEF5F5]"
                  key={idx}
                >
                  <td className="px-4 py-1 border">
                    {/* <input
                      onChange={handleInputChange}
                      checked={checkedValue.includes(dep.id)}
                      value={dep.id}
                      type="checkbox"
                      className="accent-[#157572]"
                    /> */}
                  </td>
                  <td className="px-4 py-1 text-center border ">{idx + 1}</td>
                  <td className="px-4 py-1 text-center border">
                    {productprice._id}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {productprice.productId}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {productprice.pricelistId}
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
                      //   onClick={() => handleEditClick(cate)}
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
      {/* {selectedDepartment ? (
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
                  <h1 className={classes.LabelStyle}>Mã chuyên ngành :</h1>
                  <input
                    placeholder={selectedDepartment?.maKhoa}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Tên chuyên ngành :</h1>
                  <input
                    placeholder={selectedDepartment?.tenKhoa}
                    className={classes.InputStyle}
                    type="text"
                    value={value.tenKhoa}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        tenKhoa: e.target.value,
                      })
                    }
                  />
                </div>
                
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>
                <Link to="/admin/getdepartmentall" className="btn btn-primary">
                  <button
                    className={classes.adminFormClearButton}
                    type="button"
                    onClick={() => handleModalError()}
                  >
                    Thoát
                  </button>
                </Link>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null} */}
    </div>
  );
};
export default Body;
