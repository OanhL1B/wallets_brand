import { LOGIN } from "../actionTypes";

const initialState = {
  authData: JSON.parse(localStorage.getItem("user")) || null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    default:
      return state;
  }
};

export default customerReducer;
