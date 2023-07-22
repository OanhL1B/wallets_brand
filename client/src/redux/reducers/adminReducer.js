import {
  ADD_CATEGORY,
  ADD_PRICELIST,
  ADD_PRODUCT,
  ADD_PRODUCT_PRICE,
  GET_ALL_CATEGOIES,
  GET_ALL_PRICELIST,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_PRICE,
  LOGIN,
} from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
  categoryAdded: false,
  productAdded: false,
  pricelistAdded: false,
  productpriceAdded: false,
  allCategory: [],
  allPricelist: [],
  allProduct: [],
  allProductPrice: [],
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
    default:
      return state;
  }
};

export default adminReducer;
