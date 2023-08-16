import * as types from "./CafeTypes";

export const getCafeListActionRequest = (data) => ({
  type: types.GET_CAFE_LIST_REQUEST,
  payload: { data },
});

export const getCafeListActionSuccess = (payload) => ({
  type: types.GET_CAFE_LIST_SUCCESS,
  payload,
});

export const getCafeListActionFail = (payload) => ({
  type: types.GET_CAFE_LIST_FAIL,
  payload,
});

export const addCafeActionRequest = (data) => ({
  type: types.ADD_CAFE_REQUEST,
  payload: { data },
});

export const addCafeActionSuccess = (payload) => ({
  type: types.ADD_CAFE_SUCCESS,
  payload,
});

export const addCafeActionFail = (payload) => ({
  type: types.ADD_CAFE_FAIL,
  payload,
});

export const updateCafeActionRequest = (id, data) => ({
  type: types.EDIT_CAFE_REQUEST,
  payload: { id, data },
});

export const updateCafeActionSuccess = (payload) => ({
  type: types.EDIT_CAFE_SUCCESS,
  payload,
});

export const updateCafeActionFail = (payload) => ({
  type: types.EDIT_CAFE_FAIL,
  payload,
});

export const deleteCafeActionRequest = (id) => ({
  type: types.DELETE_CAFE_REQUEST,
  payload: { id },
});

export const deleteCafeActionSuccess = (payload) => ({
  type: types.DELETE_CAFE_SUCCESS,
  payload,
});

export const deleteCafeActionFail = (payload) => ({
  type: types.DELETE_CAFE_FAIL,
  payload,
});

export const selectCafeActionRequest = (currentCafe) => ({
  type: types.SELECT_CAFE,
  payload: {
    currentCafe,
  },
});

export const resetCafeActionRequest = () => ({
  type: types.RESET_REQUEST
});
