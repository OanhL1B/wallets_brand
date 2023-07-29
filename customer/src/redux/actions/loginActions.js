import { toast } from "react-toastify";
import { ADD_USER, LOGIN, SET_ERRORS } from "../actionTypes";
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
