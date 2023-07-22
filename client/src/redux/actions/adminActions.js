import { toast } from "react-toastify";
import {
  ADD_CATEGORY,
  ADD_PRICELIST,
  ADD_PRODUCT,
  ADD_PRODUCT_PRICE,
  GET_ALL_CATEGOIES,
  GET_ALL_PRICELIST,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_PRICE,
  SET_ERRORS,
} from "../actionTypes";
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

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await api.getCategories();
    dispatch({ type: GET_ALL_CATEGOIES, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const addPriceList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addPriceList(formData);
    if (data.success === true) {
      toast.success("Thêm  mới thành công!");
      dispatch({ type: ADD_PRICELIST, payload: true });
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

export const getpricelists = () => async (dispatch) => {
  try {
    const { data } = await api.getpricelists();
    dispatch({ type: GET_ALL_PRICELIST, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const addProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addProduct(formData);
    if (data.success === true) {
      toast.success("Thêm  mới thành công!");
      dispatch({ type: ADD_PRODUCT, payload: true });
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

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: GET_ALL_PRODUCT, payload: data.products });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const addProductPrice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addProductPrice(formData);
    if (data.success === true) {
      toast.success("Thêm  mới thành công!");
      dispatch({ type: ADD_PRODUCT_PRICE, payload: true });
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

export const getProductPrices = () => async (dispatch) => {
  try {
    const { data } = await api.getProductPrices();
    dispatch({ type: GET_ALL_PRODUCT_PRICE, payload: data.retObj });
  } catch (error) {
    console.log("Redux Error", error);
  }
};
