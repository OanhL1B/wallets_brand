import {
  ADD_CART,
  ADD_ORDER_COD,
  ADD_ORDER_ONLINE,
  ADD_USER,
  CANCELED,
  DELETE_CART,
  GET_ALL_CATEGOIES,
  GET_ALL_PRODUCTS,
  GET_CART_USER,
  GET_CURRENT_USER,
  GET_ORDER_USER,
  GET_PRODUCTS_BY_CATEGORY,
  LOGIN,
  LOGOUT,
  QUEN_MAT_KHAU,
  RESET_PASSWORD,
  UPDATE_CART,
  UPDATE_USER,
} from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
  userAdded: false,
  orderOnlineAdded: false,
  orderCodAdded: false,

  updatedCart: false,
  deleteOrder: false,
  deletedCart: false,
  quenmatkhau: false,
  resetpassword: false,
  updatedCurrentUser: false,
  usercurrent: [],
  cartItems: [],
  userCarts: [],
  userOrders: [],
  allCategory: [],
  allProduct: [],
  cartAdded: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case ADD_USER:
      return {
        ...state,
        userAdded: action.payload,
      };
    case ADD_ORDER_ONLINE:
      return {
        ...state,
        orderOnlineAdded: action.payload,
      };
    case ADD_ORDER_COD:
      return {
        ...state,
        orderCodAdded: action.payload,
      };

    case ADD_CART:
      return {
        ...state,
        cartAdded: action.payload,
      };

    case GET_CART_USER:
      return {
        ...state,
        userCarts: action.payload,
      };
    case GET_ORDER_USER:
      return {
        ...state,
        userOrders: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        updatedCart: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        updatedCurrentUser: action.payload,
      };
    case CANCELED:
      return {
        ...state,
        deleteOrder: action.payload,
      };
    case DELETE_CART:
      return {
        ...state,
        deletedCart: action.payload,
      };
    case QUEN_MAT_KHAU:
      return {
        ...state,
        quenmatkhau: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetpassword: action.payload,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        usercurrent: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, authData: action?.data };
    case GET_ALL_CATEGOIES:
      return {
        ...state,
        allCategory: action.payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProduct: action.payload,
      };
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        allProduct: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
