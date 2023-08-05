import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getWarehousing,
  updateWarehousing,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
// import { deleteDepartment } from "../../../redux/actions/adminActions";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import { SET_ERRORS, UPDATE_INVENTORY } from "../../../redux/actionTypes";

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
  const inventorys = useSelector((state) => state.admin.allInventory);

  const [selectedInventory, setSelectedInventory] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWarehousing());
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
    categoryName: "",
    categoryId: "",
  });
  const handleEditClick = (inventory) => {
    setSelectedInventory(inventory);
    setIsModalOpen(true);
    setValue({
      quantity: "",
      productId: inventory?.productId,
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
    if (value.productId !== "") {
      updatedValue.productId = value.productId;
    } else {
      updatedValue.productId = selectedInventory.productId;
    }
    if (value.quantity !== "") {
      updatedValue.quantity = value.quantity;
    } else {
      updatedValue.quantity = selectedInventory.quantity;
    }

    dispatch(updateWarehousing({ ...selectedInventory, ...updatedValue }));
    dispatch({ type: UPDATE_INVENTORY, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedInventory) {
      setError({});
      closeModal();
      dispatch(getWarehousing());
    }
  }, [dispatch, store.errors, store.admin.updatedInventory]);

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
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
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
      <div className="flex mt-4"></div>
      <div className="w-full my-8 mt-6">
        {inventorys?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                {/* <th className="px-4 py-1">Chọn</th> */}
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">Product Name</th>
                <th className="px-4 py-1">Quantity</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {inventorys?.map((inventory, idx) => (
                <tr
                  className="justify-center item-center hover:bg-[#EEF5F5]"
                  key={idx}
                >
                  <td className="px-4 py-1 border">{idx + 1}</td>
                  <td className="px-4 py-1 border">{inventory.productName}</td>
                  <td className="px-4 py-1 border">{inventory.quantity}</td>

                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base  mr-5"
                      onClick={() => handleEditClick(inventory)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedInventory ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-[500px] min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Product Name :</h1>
                  <input
                    placeholder={selectedInventory?.productName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.categoryName}
                    disabled
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Quantity :</h1>
                  <input
                    placeholder={selectedInventory?.quantity}
                    className={classes.InputStyle}
                    type="text"
                    value={value.quantity}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        quantity: e.target.value,
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
