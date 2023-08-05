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
  GET_USERS,
  LOGIN,
  UPDATE_CATEGORY,
  UPDATE_PRICELIST,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_PRICE,
  UPDATE_USER_BY_ADMIN,
} from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
  categoryAdded: false,
  productAdded: false,
  pricelistAdded: false,
  updatedCategory: false,
  updatedUser: false,
  productpriceAdded: false,
  updatedProduct: false,
  updatedPriceList: false,
  updatedProductPrice: false,
  allCategory: [],
  allPricelist: [],
  allProduct: [],
  allProductPrice: [],
  usercurrent: [],
  allUsers: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case ADD_CATEGORY:
      return {
        ...state,
        categoryAdded: action.payload,
      };
    case ADD_PRICELIST:
      return {
        ...state,
        pricelistAdded: action.payload,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        productAdded: action.payload,
      };
    case ADD_PRODUCT_PRICE:
      return {
        ...state,
        productpriceAdded: action.payload,
      };
    case GET_ALL_CATEGOIES:
      return {
        ...state,
        allCategory: action.payload,
      };
    case GET_ALL_PRICELIST:
      return {
        ...state,
        allPricelist: action.payload,
      };
    case GET_ALL_PRODUCT:
      return {
        ...state,
        allProduct: action.payload,
      };
    case GET_ALL_PRODUCT_PRICE:
      return {
        ...state,
        allProductPrice: action.payload,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        updatedCategory: action.payload,
      };
    case UPDATE_USER_BY_ADMIN:
      return {
        ...state,
        updatedUser: action.payload,
      };
    case UPDATE_PRODUCT_PRICE:
      return {
        ...state,
        updatedProductPrice: action.payload,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        updatedProduct: action.payload,
      };
    case UPDATE_PRICELIST:
      return {
        ...state,
        updatedPriceList: action.payload,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        usercurrent: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
