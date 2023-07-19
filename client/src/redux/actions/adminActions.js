import { toast } from "react-toastify";
import { ADD_CATEGORY, SET_ERRORS } from "../actionTypes";
import * as api from "../api/adminapi";

export const addCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addCategory(formData);
    if (data.success === true) {
      toast.success("Thêm  mới thành công!");
      dispatch({ type: ADD_CATEGORY, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};
