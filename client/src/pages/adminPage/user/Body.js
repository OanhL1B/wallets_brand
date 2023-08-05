import React, { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getUsers,
  updateProduct,
  updateUserbyAdmin,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import {
  SET_ERRORS,
  UPDATE_PRODUCT,
  UPDATE_USER_BY_ADMIN,
} from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";
import ReactSelect from "react-select";
import ReactQuill from "react-quill";
import ImageUpload from "../../../components/ImageUpload";
import { toast } from "react-toastify";
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
    overflow: "auto",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const users = useSelector((state) => state.admin.allUsers);

  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
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
  const [modalMode, setModalMode] = useState(null);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    isBlocked: [],
  });

  const handleEditClick = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
    setValue({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "",
      isBlocked: [],
      userId: user._id,
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
    if (value.firstName !== "") {
      updatedValue.firstName = value.firstName;
    } else {
      updatedValue.firstName = selectedUser.firstName;
    }
    if (value.lastName !== "") {
      updatedValue.lastName = value.lastName;
    } else {
      updatedValue.lastName = selectedUser.lastName;
    }
    if (value.email !== "") {
      updatedValue.email = value.email;
    } else {
      updatedValue.email = selectedUser.email;
    }
    if (value.phoneNumber !== "") {
      updatedValue.phoneNumber = value.phoneNumber;
    } else {
      updatedValue.phoneNumber = selectedUser.phoneNumber;
    }
    if (value.role !== "") {
      updatedValue.role = value.role;
    } else {
      updatedValue.role = selectedUser.role;
    }
    if (value.isBlocked !== "") {
      updatedValue.isBlocked = value.isBlocked;
    } else {
      updatedValue.isBlocked = selectedUser.isBlocked;
    }
    if (value.userId !== "") {
      updatedValue.userId = value.userId;
    } else {
      updatedValue.userId = selectedUser.userId;
    }

    dispatch(updateUserbyAdmin({ ...selectedUser, ...updatedValue }));
    dispatch({ type: UPDATE_USER_BY_ADMIN, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedUser) {
      setError({});
      closeModal();
      dispatch(getUsers());
    }
  }, [dispatch, store.errors, store.admin.updatedUser]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // begin view
  // const [modalMode, setModalMode] = useState(null);
  //   const handleOpenViewModal = (product) => {
  //     console.log("vô đây nè");
  //     setSelectedProduct(product);
  //     setModalMode("view");
  //     setIsModalOpen(true);
  //   };
  //end view

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
      <div className="flex mt-4"></div>
      <div className="w-full my-8 mt-6">
        {users?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">firstName</th>
                <th className="px-4 py-1">lastName</th>
                <th className="px-4 py-1">email</th>
                <th className="px-4 py-1">phoneNumber</th>
                <th className="px-4 py-1">role</th>
                <th className="px-4 py-1">isBlocked</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {users?.map((user, idx) => (
                <tr className="justify-center  hover:bg-[#EEF5F5]" key={idx}>
                  <td className="px-4 py-1 border ">{idx + 1}</td>

                  <td className="px-4 py-1 border">{user.firstName}</td>
                  <td className="px-4 py-1 border">{user.lastName}</td>
                  <td className="px-4 py-1 border">{user.email}</td>
                  <td className="px-4 py-1 border">{user.phoneNumber}</td>
                  <td className="px-4 py-1 border">{user.role}</td>
                  <td className="px-4 py-1 border">
                    {user.isBlocked === false ? "Enabled" : "Disabled"}
                  </td>
                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {/* <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base mr-2"
                      onClick={() => handleOpenViewModal(user)}
                    >
                      View
                    </button> */}
                    {/* {modalMode === "view" && (
                      <ProductDetail
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        product={selectedProduct}
                      />
                    )} */}
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => handleEditClick(user)}
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
      {/* modal edit */}
      {selectedUser && modalMode === "edit" ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col mx-5 mt-10 rounded-xl">
            <form
              className="w-[800px] min-h-[300px] py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-2 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>FirstName :</h1>
                  <input
                    placeholder={selectedUser?.firstName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>LastName :</h1>
                  <input
                    placeholder={selectedUser?.lastName}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>email :</h1>
                  <input
                    placeholder={selectedUser?.email}
                    disabled
                    className={classes.InputStyle}
                    type="text"
                  />
                </div>

                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>PhoneNumber :</h1>
                  <input
                    placeholder={selectedUser?.phoneNumber}
                    className={classes.InputStyle}
                    disabled
                    type="text"
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Role *:</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={value.role || selectedUser?.role}
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.role || selectedUser?.role}
                    onChange={(e) =>
                      setValue({ ...value, role: e.target.value })
                    }
                    className={`${classes.InputStyle} hover:focus:border-none `}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </Select>
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>isBlocked :</h1>
                  <Select
                    required
                    placeholder={value.isBlocked || selectedUser.isBlocked}
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.isBlocked || selectedUser.isBlocked}
                    onChange={(e) =>
                      setValue({ ...value, isBlocked: e.target.value })
                    }
                    className={classes.InputStyle}
                  >
                    <MenuItem value="true">Disabled</MenuItem>
                    <MenuItem value="false">Enabled</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-center mt-5 space-x-6">
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
