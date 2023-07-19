import {
  ADD_CATEGORY,
  ADD_PRICELIST,
  GET_ALL_CATEGOIES,
  GET_ALL_PRICELIST,
  LOGIN,
} from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
  categoryAdded: false,
  pricelistAdded: false,
  allCategory: [],
  allPricelist: [],
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
    default:
      return state;
  }
};

export default adminReducer;
