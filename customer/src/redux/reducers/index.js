import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import customerReducer from "./userActions";

export default combineReducers({
  errors: errorReducer,
  customer: customerReducer,
});
