import { call, put } from "redux-saga/effects";
import API from "./CafeApis";
import * as ACTIONS from "./CafeAction";
import { dispatchSnackbarError, dispatchSnackbarInfo } from "../../utils/Shared";
import { takeLatest } from "redux-saga/effects";
import * as TYPES from "./CafeTypes";
import store from "..";
import { CommonText, CafeText } from "../../utils/Texts";

//get cafe list
export function* sagaRequestCafeList(action) {
  const params = action.payload;
  try {
    const response = yield call(API.getCafeListRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.getCafeListActionFail(response?.data?.message));
    } else {
      yield put(ACTIONS.getCafeListActionSuccess(response?.data));
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaListError} ${CafeText.sagaErrorText}`;
    dispatchSnackbarError(errTxt);
    yield put(ACTIONS.getCafeListActionFail(errTxt));
  }
}

//add cafe
export function* sagaRequestCafeAdd(action) {
  const params = action.payload;
  try {
    const response = yield call(API.addCafeRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.addCafeActionFail(response?.data?.message));
      dispatchSnackbarError(response?.data?.message);
    } else {
      yield put(ACTIONS.addCafeActionSuccess(response?.data));
      dispatchSnackbarInfo(response?.data?.message);
      store.dispatch(ACTIONS.getCafeListActionRequest());
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaAddError} ${CafeText.sagaErrorText}`;
    dispatchSnackbarError(errTxt);
    yield put(ACTIONS.addCafeActionFail(errTxt));
  }
}

//edit cafe
export function* sagaRequestCafeEdit(action) {
  const params = action.payload;
  try {
    const response = yield call(API.updateCafeRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.updateCafeActionFail(response?.data?.message));
      dispatchSnackbarError(response?.data?.message);
    } else {
      yield put(ACTIONS.updateCafeActionSuccess(response?.data));
      dispatchSnackbarInfo(response?.data?.message);
      store.dispatch(ACTIONS.getCafeListActionRequest());
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaEditError} ${CafeText.sagaErrorText}`;
    dispatchSnackbarError(errTxt);
    yield put(ACTIONS.updateCafeActionFail(errTxt));
  }
}

//delete cafe
export function* sagaRequestCafeDelete(action) {
  const params = action.payload;
  try {
    const response = yield call(API.removeCafeRequest, params);
    if (response?.data?.error) {
      yield put(ACTIONS.deleteCafeActionFail(response?.data?.message));
      dispatchSnackbarError(response?.data?.message);
    } else {
      yield put(ACTIONS.deleteCafeActionSuccess(response?.data));
      dispatchSnackbarInfo(response?.data?.message);
      store.dispatch(ACTIONS.getCafeListActionRequest());
    }
  } catch (err) {
    console.log(err);
    const errTxt = err?.response?.statusText ?? `${CommonText.sagaError} ${CommonText.sagaDeleteError} ${CafeText.sagaErrorText}`;
    dispatchSnackbarError(errTxt);
    yield put(ACTIONS.deleteCafeActionFail(errTxt));
  }
}


export function* CafeSaga() {
  yield takeLatest(TYPES.GET_CAFE_LIST_REQUEST, sagaRequestCafeList);
  yield takeLatest(TYPES.ADD_CAFE_REQUEST, sagaRequestCafeAdd);
  yield takeLatest(TYPES.EDIT_CAFE_REQUEST, sagaRequestCafeEdit);
  yield takeLatest(TYPES.DELETE_CAFE_REQUEST, sagaRequestCafeDelete);
}
