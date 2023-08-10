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
  GET_CURRENT_USER,
  GET_INVENTORY,
  GET_ORDERS,
  GET_USERS,
  SET_ERRORS,
  UPDATE_CATEGORY,
  UPDATE_INVENTORY,
  UPDATE_ORDER_STATUS,
  UPDATE_PRICELIST,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_PRICE,
  UPDATE_USER_BY_ADMIN,
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
    dispatch({ type: SET_ERRORS, payload: error.response.data });
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
    dispatch({ type: SET_ERRORS, payload: error.response.data });
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
    console.log("data", data);
    if (data.success === true) {
      toast.success("Thêm  mới thành công!");
      dispatch({ type: ADD_PRODUCT, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: GET_ALL_PRODUCT, payload: data.retObj });
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
    dispatch({ type: SET_ERRORS, payload: error.response.data });
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

export const updateCategory = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateCategory(formData);
    console.log("data", data);
    if (data.success === true) {
      toast.success("updated category successfully!");
      dispatch({ type: UPDATE_CATEGORY, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
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

export const updateProduct = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(formData);
    if (data.success === true) {
      toast.success("updated product successfully!");
      dispatch({ type: UPDATE_PRODUCT, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updatePriceList = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updatePriceList(formData);
    if (data.success === true) {
      toast.success("updated pricelist successfully!");
      dispatch({ type: UPDATE_PRICELIST, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const updateProductPrice = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateProductPrice(formData);
    if (data.success === true) {
      toast.success("updated product price successfully!");
      dispatch({ type: UPDATE_PRODUCT_PRICE, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    if (data.success === true) {
      dispatch({ type: GET_USERS, payload: data.retObj });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data.mes }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateUserbyAdmin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUserbyAdmin(formData);
    if (data.success === true) {
      toast.success("updated user price successfully!");
      dispatch({ type: UPDATE_USER_BY_ADMIN, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await api.getOrders();
    if (data.success === true) {
      dispatch({ type: GET_ORDERS, payload: data.retObj });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const getWarehousing = () => async (dispatch) => {
  try {
    const { data } = await api.getWarehousing();
    if (data.success === true) {
      dispatch({ type: GET_INVENTORY, payload: data.retObj });
    } else {
      dispatch(dispatch({ type: SET_ERRORS, payload: data }));
    }
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateOrderStatus = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateOrderStatus(formData);
    if (data.success === true) {
      toast.success("updated order successfully!");
      dispatch({ type: UPDATE_ORDER_STATUS, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
export const updateWarehousing = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateWarehousing(formData);
    if (data.success === true) {
      toast.success("updated order successfully!");
      dispatch({ type: UPDATE_INVENTORY, payload: true });
    } else {
      toast.error("updated error!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
