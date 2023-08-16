import { SAGA_ACTIONS } from "../../utils/Constants";
import * as types from "./EmployeeTypes";

const INITIAL_STATE = {
  employees: [],
  empListLoading: true,
  editEmp: undefined,
  empAction: "",
  empError: false,
  empErrMsg: "",
  showEmpLoader: false,
};

//Reducer to handle employee list
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_EMP_REQUEST:
      return {
        ...state,
        editEmp: undefined,
        empAction: SAGA_ACTIONS.GET,
        empError: false,
        empErrMsg: "",
        showEmpLoader: true,
      };
    case types.GET_EMP_SUCCESS:
      return {
        ...state,
        editEmp: action.payload.data,
        empAction: "",
        empError: false,
        empErrMsg: "",
        showEmpLoader: false,
      };
    case types.GET_EMP_FAIL:
      return {
        ...state,
        empAction: SAGA_ACTIONS.GET,
        empError: true,
        empErrMsg: action.payload.data,
        showEmpLoader: false,
      };
    case types.GET_EMP_RESET:
      return {
        ...state,
        editEmp: undefined,
      };
    case types.GET_EMP_LIST_REQUEST:
      return {
        ...state,
        empListLoading: true,
        empAction: SAGA_ACTIONS.LIST,
        empError: false,
        empErrMsg: "",
        showEmpLoader: false,
      };
    case types.GET_EMP_LIST_SUCCESS:
      return {
        ...state,
        employees: Array.from(action.payload.data),
        empListLoading: false,
        empAction: "",
        empError: false,
        empErrMsg: "",
        showEmpLoader: false,
      };
    case types.GET_EMP_LIST_FAIL:
      return {
        ...state,
        empListLoading: false,
        empAction: SAGA_ACTIONS.GET,
        empError: true,
        empErrMsg: action.payload.data,
        showEmpLoader: false,
      };
    case types.ADD_EMP_REQUEST:
      return {
        ...state,
        empAction: SAGA_ACTIONS.ADD,
        empError: true,
        empErrMsg: "",
        showEmpLoader: true,
      };
    case types.ADD_EMP_FAIL:
      return {
        ...state,
        empAction: SAGA_ACTIONS.ADD,
        empError: true,
        empErrMsg: action.payload.data,
        showEmpLoader: false,
      };
    case types.EDIT_EMP_REQUEST:
      return {
        ...state,
        empAction: SAGA_ACTIONS.UPDATE,
        empError: true,
        empErrMsg: "",
        showEmpLoader: true,
      };
    case types.EDIT_EMP_FAIL:
      return {
        ...state,
        empAction: SAGA_ACTIONS.UPDATE,
        empError: true,
        empErrMsg: action.payload.data,
        showEmpLoader: false,
      };
    case types.DELETE_EMP_REQUEST:
      return {
        ...state,
        empAction: SAGA_ACTIONS.DELETE,
        empError: true,
        empErrMsg: "",
        showEmpLoader: true,
      };
    case types.DELETE_EMP_FAIL:
      return {
        ...state,
        empAction: SAGA_ACTIONS.DELETE,
        empError: true,
        empErrMsg: action.payload.data,
        showEmpLoader: false,
      };
    case types.ADD_EMP_SUCCESS:
    case types.EDIT_EMP_SUCCESS:
    case types.DELETE_EMP_SUCCESS:
      return {
        ...state,
        empError: false,
        empErrMsg: "",
        showEmpLoader: false,
      };
    case types.RESET_REQUEST:
      return {
        ...state,
        empAction: "",
        empError: false,
        empErrMsg: "",
        showEmpLoader: false,
      };
    default:
      return state;
  }
};
