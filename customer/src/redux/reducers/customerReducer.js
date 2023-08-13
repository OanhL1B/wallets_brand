import {
  ADD_CART,
  ADD_ORDER,
  ADD_USER,
  CANCELED,
  DELETE_CART,
  GET_CART_USER,
  GET_CURRENT_USER,
  GET_ORDER_USER,
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
  orderAdded: false,
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

    // case ADD_CART:
    //   const updatedUserCarts = state.userCarts.map((item) => {
    //     if (item.productId._id === action.payload.productId._id) {
    //       return {
    //         ...item,
    //         quantity: item.quantity + 1,
    //       };
    //     }
    //     return item;
    //   });

    case ADD_CART:
      const existingProduct = state.userCarts?.find(
        (item) => item.productId._id === action.payload.productId
      );

      if (existingProduct) {
        state.userCarts = state.userCarts.map((item) =>
          item.productId._id === action.payload.productId
            ? {
                ...item,
                productId: {
                  ...item.productId,
                  quantity: item.productId.quantity + 1,
                },
              }
            : item
        );
        return { ...state.userCarts };
      } else {
        state.userCarts = [...state.userCarts, { ...action.payload }];
        return { ...state };
      }

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
    default:
      return state;
  }
};

export default customerReducer;
