import { call, put } from "redux-saga/effects";
import API from "./EmployeeApis";
import * as ACTIONS from "./EmployeeAction";
import { dispatchSnackbarError, dispatchSnackbarInfo } from "../../utils/Shared";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "./EmployeeTypes";
import store from "..";
import { CommonText, EmployeeText } from "../../utils/Texts";

//get employee
export function* sagaRequestEmployee(action) {
  const params = action.payload;
  try {
    const response = yield call(API.getEmployeeRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.getEmployeeActionFail(response?.data?.message));
    } else {
      yield put(ACTIONS.getEmployeeActionSuccess(response?.data));
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaGetError} ${EmployeeText.sagaErrorText}`;
    yield put(ACTIONS.getEmployeeActionFail(errTxt));
    dispatchSnackbarError(errTxt);
  }
}

//get employee list
export function* sagaRequestEmployeeList(action) {
  const params = action.payload;
  try {
    const response = yield call(API.getEmployeeListRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.getEmployeeListActionFail(response?.data?.message));
    } else {
      yield put(ACTIONS.getEmployeeListActionSuccess(response?.data));
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaListError} ${EmployeeText.sagaErrorText}`;
    yield put(ACTIONS.getEmployeeListActionFail(errTxt));
    dispatchSnackbarError(errTxt);
  }
}

//add employee
export function* sagaRequestEmployeeAdd(action) {
  const params = action.payload;
  try {
    const response = yield call(API.addEmployeeRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.addEmployeeActionFail(response?.data?.message));
      dispatchSnackbarError(response?.data?.message);
    } else {
      yield put(ACTIONS.addEmployeeActionSuccess(response?.data));
      dispatchSnackbarInfo(response?.data?.message);
      store.dispatch(ACTIONS.getEmployeeListActionRequest());
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaAddError} ${EmployeeText.sagaErrorText}`;
    dispatchSnackbarError(errTxt);
    yield put(ACTIONS.addEmployeeActionFail(errTxt));

  }
}

//edit employee
export function* sagaRequestEmployeeEdit(action) {
  const params = action.payload;
  try {
    const response = yield call(API.updateEmployeeRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.updateEmployeeActionFail(response?.data?.message));
      dispatchSnackbarError(response?.data?.message);
    } else {
      yield put(ACTIONS.updateEmployeeActionSuccess(response?.data));
      dispatchSnackbarInfo(response?.data?.message);
      store.dispatch(ACTIONS.getEmployeeListActionRequest());
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaEditError} ${EmployeeText.sagaErrorText}`;
    dispatchSnackbarError(errTxt);
    yield put(ACTIONS.updateEmployeeActionFail(errTxt));
  }
}

//delete employee
export function* sagaRequestEmployeeDelete(action) {
  const params = action.payload;
  try {
    const response = yield call(API.removeEmployeeRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.deleteEmployeeActionFail(response?.data?.message));
      dispatchSnackbarError(response?.data?.message);
    } else {
      yield put(ACTIONS.deleteEmployeeActionSuccess(response?.data));
      dispatchSnackbarInfo(response?.data?.message);
      store.dispatch(ACTIONS.getEmployeeListActionRequest());
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaDeleteErr} ${EmployeeText.sagaErrorText}`;
    dispatchSnackbarError(errTxt);
    yield put(ACTIONS.deleteEmployeeActionFail(errTxt));
  }
}


export function* EmployeeSaga() {
  yield takeLatest(TYPES.GET_EMP_REQUEST, sagaRequestEmployee);
  yield takeLatest(TYPES.GET_EMP_LIST_REQUEST, sagaRequestEmployeeList);
  yield takeLatest(TYPES.ADD_EMP_REQUEST, sagaRequestEmployeeAdd);
  yield takeLatest(TYPES.EDIT_EMP_REQUEST, sagaRequestEmployeeEdit);
  yield takeLatest(TYPES.DELETE_EMP_REQUEST, sagaRequestEmployeeDelete);
}
