import { ADD_CATEGORY, LOGIN } from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
  categoryAdded: false,
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
    default:
      return state;
  }
};

export default adminReducer;
