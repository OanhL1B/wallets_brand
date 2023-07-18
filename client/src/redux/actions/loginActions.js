import { toast } from "react-toastify";
import { LOGIN, SET_ERRORS } from "../actionTypes";
import * as api from "../api/adminapi";

export const userLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(formData);
    console.log("data", data);
    if (data.success === true) {
      dispatch({ type: LOGIN, data: data });
      toast.success("Đăng nhập thành công!");
      navigate("/dashboard");
    } else {
      toast.error("email hoặc mật khẩu hoặc mật khẩu chưa đúng!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
