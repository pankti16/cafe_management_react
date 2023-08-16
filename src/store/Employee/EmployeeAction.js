import * as types from "./EmployeeTypes";

export const getEmployeeActionRequest = (data) => ({
  type: types.GET_EMP_REQUEST,
  payload: { data },
});

export const getEmployeeActionSuccess = (payload) => ({
  type: types.GET_EMP_SUCCESS,
  payload,
});

export const getEmployeeActionFail = (payload) => ({
  type: types.GET_EMP_FAIL,
  payload,
});

export const getEmployeeActionReset = () => ({
  type: types.GET_EMP_RESET,
});

export const getEmployeeListActionRequest = (data) => ({
  type: types.GET_EMP_LIST_REQUEST,
  payload: { data },
});

export const getEmployeeListActionSuccess = (payload) => ({
  type: types.GET_EMP_LIST_SUCCESS,
  payload,
});

export const getEmployeeListActionFail = (payload) => ({
  type: types.GET_EMP_LIST_FAIL,
  payload,
});

export const addEmployeeActionRequest = (data) => ({
  type: types.ADD_EMP_REQUEST,
  payload: { data },
});

export const addEmployeeActionSuccess = (payload) => ({
  type: types.ADD_EMP_SUCCESS,
  payload,
});

export const addEmployeeActionFail = (payload) => ({
  type: types.ADD_EMP_FAIL,
  payload,
});

export const updateEmployeeActionRequest = (data) => ({
  type: types.EDIT_EMP_REQUEST,
  payload: { data },
});

export const updateEmployeeActionSuccess = (payload) => ({
  type: types.EDIT_EMP_SUCCESS,
  payload,
});

export const updateEmployeeActionFail = (payload) => ({
  type: types.EDIT_EMP_FAIL,
  payload,
});

export const deleteEmployeeActionRequest = (id) => ({
  type: types.DELETE_EMP_REQUEST,
  payload: { id },
});

export const deleteEmployeeActionSuccess = (payload) => ({
  type: types.DELETE_EMP_SUCCESS,
  payload,
});

export const deleteEmployeeActionFail = (payload) => ({
  type: types.DELETE_EMP_FAIL,
  payload,
});

export const resetEmployeeActionRequest = () => ({
  type: types.RESET_REQUEST
});