import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentUser,
  updateUser,
} from "../../../redux/actions/adminActions";
import { UPDATE_USER } from "../../../redux/actionTypes";
import ReactModal from "react-modal";
import * as classes from "../../../utils/styles";
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
  },
};

const Body = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  const store = useSelector((state) => state);

  const user = useSelector((state) => state.admin.usercurrent);

  // EDIT
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    image: "",
  });
  const handleEditClick = () => {
    setIsModalOpen(true);
    setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user?.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      image: "",
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      image: url,
    }));
  };
  const handleUploadError = () => {
    toast.error("load image error!");
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(7[0-9]{8}|0[0-9]{9}|\+94[0-9]{9})$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.firstName !== "") {
      updatedValue.firstName = value.firstName;
    } else {
      updatedValue.firstName = user.firstName;
    }
    if (value.lastName !== "") {
      updatedValue.lastName = value.lastName;
    } else {
      updatedValue.lastName = user.lastName;
    }
    if (value.address !== "") {
      updatedValue.address = value.address;
    } else {
      updatedValue.address = user.address;
    }

    if (value.phoneNumber !== "") {
      updatedValue.phoneNumber = value.phoneNumber;
    } else {
      updatedValue.phoneNumber = user.phoneNumber;
    }
    if (value.image !== "") {
      updatedValue.image = value.image;
    } else {
      updatedValue.image = user.image;
    }

    dispatch(updateUser({ ...user, ...updatedValue }));
    dispatch({ type: UPDATE_USER, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedCurrentUser) {
      closeModal();
      dispatch(getCurrentUser());
    }
  }, [dispatch, store.errors, store.admin.updatedCurrentUser]);

  const handleModalError = () => {
    closeModal();
  };

  return (
    <div>
      <div className="mx-2 mt-10 item-center ">
        <div className="items-center justify-center space-y-5">
          <div className="w-[1114px] h-[568px] py-8  text-center justify-center bg-primary bg-opacity-10 border rounded-md  shadow-md mx-auto flex   gap-x-10">
            <div className="w-[220px] h-[220px] bg-[#DDDEEE] bg-opacity-50 rounded-full mr-10">
              <Avatar src={user?.image} style={{ width: 220, height: 220 }} />
            </div>
            <div
              className="flex flex-row font-sans gap-x-3 "
              style={{ alignItems: "baseline" }}
            >
              <div
                className="flex flex-col font-sans gap-y-5"
                style={{ width: "130px", textAlign: "left" }}
              >
                <span className="font-sans">Họ và tên</span>
                <span className="font-sans">Email</span>
                <span className="font-sans">Số điện thoại</span>
                <span className="font-sans">Địa chỉ</span>
              </div>
              <div
                className="flex flex-col gap-y-5"
                style={{ width: "250px", textAlign: "left" }}
              >
                <span>
                  {user?.lastName} {user?.firstName}
                </span>
                <span>{user?.email}</span>
                <span>{user?.phoneNumber}</span>
                <span>{user?.address}</span>
                <button
                  className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base mr-10 items-center "
                  onClick={() => handleEditClick()}
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col bg-white rounded-xl ">
            <form
              className="w-[800px] min-h-[300px] py-10 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="flex gap-x-10">
                <div className="flex items-center gap-x-6">
                  <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 rounded-full">
                    <Avatar
                      src={value.image || user.image}
                      style={{ width: 180, height: 180 }}
                    />
                  </div>

                  <div className="flex flex-col w-full gap-y-5">
                    <ImageUpload
                      onUploadSuccess={handleUploadSuccess}
                      onUploadError={handleUploadError}
                    />
                  </div>
                </div>
                <div className="grid w-full grid-cols-1">
                  <div className={classes.WrapInputLabel}>
                    <h1 className={classes.LabelStyle}>Họ :</h1>
                    <input
                      required
                      placeholder={user?.lastName}
                      className={classes.InputStyle}
                      type="text"
                      value={value.lastName}
                      onChange={(e) =>
                        setValue({
                          ...value,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className={classes.WrapInputLabel}>
                    <h1 className={classes.LabelStyle}>Tên :</h1>
                    <input
                      required
                      className={classes.InputStyle}
                      type="text"
                      value={value.firstName}
                      onChange={(e) =>
                        setValue({
                          ...value,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className={classes.WrapInputLabel}>
                    <h1 className={classes.LabelStyle}>Số điện thoại :</h1>
                    <input
                      required
                      placeholder="Số điện thoại"
                      className={classes.InputStyle}
                      type="number"
                      value={value.phoneNumber}
                      pattern="(7[0-9]{8}|0[0-9]{9}|\+94[0-9]{9})$"
                      title="Vui lòng nhập số điện thoại đúng định dạng."
                      inputMode="numeric"
                      onChange={(e) =>
                        setValue({ ...value, phoneNumber: e.target.value })
                      }
                    />
                    {!isValidPhoneNumber(value.phoneNumber) && (
                      <p className="text-red-500">
                        Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại
                        đúng định dạng.
                      </p>
                    )}
                  </div>

                  <div className={classes.WrapInputLabel}>
                    <h1 className={classes.LabelStyle}>Địa chỉ :</h1>
                    <input
                      required
                      className={classes.InputStyle}
                      type="text"
                      value={value.address}
                      onChange={(e) =>
                        setValue({
                          ...value,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-10 space-x-6">
                <button
                  className={classes.adminFormSubmitButton}
                  type="submit"
                  disabled={!isValidPhoneNumber(value.phoneNumber)}
                >
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
            </form>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default Body;
