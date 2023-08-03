import { toast } from "react-toastify";
import {
  ADD_CART,
  ADD_ORDER,
  ADD_USER,
  GET_CART_USER,
  GET_ORDER_USER,
  LOGIN,
  SET_ERRORS,
  UPDATE_CART,
} from "../actionTypes";
import * as api from "../api/customerapi";

export const userLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(formData);
    if (data.success === true) {
      dispatch({ type: LOGIN, data: data });
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } else {
      toast.error("email hoặc mật khẩu hoặc mật khẩu chưa đúng!");
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

export const addCart = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCart(formData);
    if (data.success === true) {
      toast.success("Thêm vào giỏ hàng thành công!");
      dispatch({ type: ADD_CART, payload: true });
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
