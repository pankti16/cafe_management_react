import store from "../store";
import { showSnackbarAction } from "../store/Snackbar/SnackbarAction";

// To show error message that returned from backend
export function dispatchSnackbarError(message) {
  if (!message) return;
  store.dispatch(showSnackbarAction(message, "error"));
}
// To show success message after any success request
export function dispatchSnackbarSuccess(message) {
  if (!message) return;
  store.dispatch(
    showSnackbarAction(message, 'success')
  );
}
// To show success message after any info request
export function dispatchSnackbarInfo(message) {
  if (!message) return;
  store.dispatch(
    showSnackbarAction(message, 'info')
  );
}

//Replace _ from name with space
export function replaceUnderscore(str) {
  if (!str) return str;
  return str.replaceAll('_', ' ')
}
