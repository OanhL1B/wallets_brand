import { toast } from "react-toastify";
import {
  ADD_CART,
  ADD_ORDER,
  ADD_USER,
  CANCELED,
  DELETE_CART,
  GET_CART_USER,
  GET_CURRENT_USER,
  GET_ORDER_USER,
  INCREASE_CART_ITEM_QUANTITY,
  LOGIN,
  QUEN_MAT_KHAU,
  RESET_PASSWORD,
  SET_ERRORS,
  UPDATE_CART,
  UPDATE_CART_ITEM_QUANTITY,
  UPDATE_USER,
} from "../actionTypes";
import * as api from "../api/customerapi";

// export const userLogin = (formData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.userLogin(formData);
//     if (data.success === true) {
//       dispatch({ type: LOGIN, data: data });
//       toast.success("Đăng nhập thành công!");
//       navigate("/");
//     } else {
//       toast.error("email hoặc mật khẩu hoặc mật khẩu chưa đúng!");
//     }
//   } catch (error) {
//     dispatch({ type: SET_ERRORS, payload: error.response.data });
//   }
// };
export const userLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(formData);
    if (data.success === true) {
      if (data.userData.isBlocked) {
        toast.error(
          "Tài khoản của bạn đã bị block. Vui lòng liên hệ quản trị viên."
        );
      } else {
        dispatch({ type: LOGIN, data: data });
        toast.success("Đăng nhập thành công!");
        navigate("/");
      }
    } else {
      toast.error("Email hoặc mật khẩu không đúng!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addUser(formData);
    if (data.success === true) {
      toast.success("Đăng ký tài khoản thành công!");
      dispatch({ type: ADD_USER, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

// export const addCart = (formData) => async (dispatch) => {
//   try {
//     const { data } = await api.addCart(formData);
//     if (data.success === true) {
//       toast.success("Thêm vào giỏ hàng thành công!");
//       dispatch({ type: ADD_CART, payload: true });
//     } else {
//       dispatch({ type: SET_ERRORS, payload: data });
//     }
//   } catch (error) {
//     if (
//       error.response &&
//       error.response.data &&
//       error.response.data.status === "error"
//     ) {
//       dispatch({ type: SET_ERRORS, payload: error.response });
//     } else {
//       console.log("Unknown error occurred");
//     }
//   }
// };

export const addCart = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCart(formData);
    if (data.success === true) {
      toast.success("Thêm vào giỏ hàng thành công!");
      dispatch({ type: ADD_CART, payload: data.retObj });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

export const addOrder = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addOrder(formData);
    console.log("data", data);
    if (data.success === true) {
      toast.success("Đặt hàng thành công hàng thành công!");
      dispatch({ type: ADD_ORDER, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
export const getCartUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getCartUser(userId);
    dispatch({ type: GET_CART_USER, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateCartQuantity = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCartQuantity(formData);
    if (data.success === true) {
      dispatch({ type: UPDATE_CART, payload: true });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getOrderUser = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getOrderUser(userId);
    dispatch({ type: GET_ORDER_USER, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const Canceled = (formData) => async (dispatch) => {
  try {
    const { data } = await api.Canceled(formData);
    console.log("data", data);
    if (data.success === true) {
      toast.success("Hủy đơn hàng công hàng thành công!");
      dispatch({ type: CANCELED, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

export const deleteCart = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCart(formData);
    console.log("data", data);
    if (data.success === true) {
      toast.success("xóa giỏ hàng thành công!");
      dispatch({ type: DELETE_CART, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

export const quenMatKhau = (email) => async (dispatch) => {
  try {
    const { data } = await api.quenMatKhau(email);
    if (data.success === true) {
      toast.success("Đã gởi mail thành công!");
      dispatch({ type: QUEN_MAT_KHAU, payload: true });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const Resetpassword = (dataBody, pass) => async (dispatch) => {
  try {
    const { data } = await api.Resetpassword(dataBody, pass);
    if (data.success === true) {
      dispatch({ type: RESET_PASSWORD, payload: true });
      toast.success("Đặt lại mật khẩu thành công!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await api.getCurrentUser();
    dispatch({ type: GET_CURRENT_USER, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);
    if (data.success === true) {
      toast.success("Cập nhật thông tin thành công!");
      dispatch({ type: UPDATE_USER, payload: true });
    } else {
      toast.error("Chỉnh sửa thông tin thất bại!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};