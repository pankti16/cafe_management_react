import { SAGA_ACTIONS } from "../../utils/Constants";
import * as types from "./CafeTypes";

const INITIAL_STATE = {
  cafes: [],
  currentCafe: {},
  cafeListLoading: true,
  cafeAction: "",
  cafeError: false,
  cafeErrMsg: "",
  showCafeLoader: false,
};

//Reducer to handle cafe list and selected cafe
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_CAFE_LIST_REQUEST:
      return {
        ...state,
        cafeListLoading: true,
        cafeAction: SAGA_ACTIONS.LIST,
        cafeError: false,
        cafeErrMsg: "",
        showCafeLoader: false,
      };
    case types.GET_CAFE_LIST_SUCCESS:
      return {
        ...state,
        cafes: Array.from(action.payload.data),
        cafeListLoading: false,
        cafeAction: "",
        cafeError: false,
        cafeErrMsg: "",
        showCafeLoader: false,
      };
    case types.GET_CAFE_LIST_FAIL:
      return {
        ...state,
        cafeListLoading: false,
        cafeAction: SAGA_ACTIONS.LIST,
        cafeError: true,
        cafeErrMsg: action.payload.data,
        showCafeLoader: false,
      };
    case types.SELECT_CAFE:
      return {
        ...state,
        currentCafe: action.payload.currentCafe,
      };
    case types.ADD_CAFE_REQUEST:
      return {
        ...state,
        cafeAction: SAGA_ACTIONS.ADD,
        cafeError: true,
        cafeErrMsg: "",
        showCafeLoader: true,
      };
    case types.ADD_CAFE_FAIL:
      return {
        ...state,
        cafeAction: SAGA_ACTIONS.ADD,
        cafeError: true,
        cafeErrMsg: action.payload.data,
        showCafeLoader: false,
      };
    case types.EDIT_CAFE_REQUEST:
      return {
        ...state,
        cafeAction: SAGA_ACTIONS.UPDATE,
        cafeError: true,
        cafeErrMsg: "",
        showCafeLoader: true,
      };
    case types.EDIT_CAFE_FAIL:
      return {
        ...state,
        cafeAction: SAGA_ACTIONS.UPDATE,
        cafeError: true,
        cafeErrMsg: action.payload.data,
        showCafeLoader: false,
      };
    case types.DELETE_CAFE_REQUEST:
      return {
        ...state,
        cafeAction: SAGA_ACTIONS.DELETE,
        cafeError: true,
        cafeErrMsg: "",
        showCafeLoader: true,
      };
    case types.DELETE_CAFE_FAIL:
      return {
        ...state,
        cafeAction: SAGA_ACTIONS.DELETE,
        cafeError: true,
        cafeErrMsg: action.payload.data,
        showCafeLoader: false,
      };
    case types.ADD_CAFE_SUCCESS:
    case types.EDIT_CAFE_SUCCESS:
    case types.DELETE_CAFE_SUCCESS:
      return {
        ...state,
        cafeError: false,
        cafeErrMsg: "",
        showCafeLoader: false,
      };
    case types.RESET_REQUEST:
      return {
        ...state,
        cafeAction: "",
        cafeError: false,
        cafeErrMsg: "",
        showCafeLoader: false,
      };
    default:
      return state;
  }
};
