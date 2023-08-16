import { CafeSaga } from '../Cafe/CafeSagas';
import { all } from "redux-saga/effects";
import { EmployeeSaga } from '../Employee/EmployeeSagas';

export function* watchSagas() {
  yield all([CafeSaga(), EmployeeSaga()]);
}
