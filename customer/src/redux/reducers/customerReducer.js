import {
  ADD_CART,
  ADD_ORDER,
  ADD_USER,
  CANCELED,
  DELETE_CART,
  GET_CART_USER,
  GET_ORDER_USER,
  LOGIN,
  LOGOUT,
  UPDATE_CART,
} from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
  userAdded: false,
  orderAdded: false,
  updatedCart: false,
  deleteOrder: false,
  deletedCart: false,

  cartItems: [],
  userCarts: [],
  userOrders: [],
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
    case ADD_ORDER:
      return {
        ...state,
        orderAdded: action.payload,
      };
    case ADD_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
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
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, authData: action?.data };
    default:
      return state;
  }
};

export default customerReducer;
