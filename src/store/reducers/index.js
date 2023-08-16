import { combineReducers } from "redux";
import loader from "../Loader/LoaderReducer";
import snackbar from "../Snackbar/SnackbarReducer";
import cafe from "../Cafe/CafeReducer";
import employee from "../Employee/EmployeeReducer";

export default combineReducers({
  loader,
  snackbar,
  cafe,
  employee
});
