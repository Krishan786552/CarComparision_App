import { put, takeEvery, call, select} from "redux-saga/effects";
import { fetchCompareCarData, setData } from "./CompareCarsSlice";
import {  getCompareCarsDataApi } from "./CompareCarsServices";

// saga to fetch the data for the selected cars to compare
export function* fetchCarsData(ids) {
  try {
    const data = yield call(getCompareCarsDataApi, ids);
    if (data) {
      yield put(setData(data));
    }
  } catch(err) {
    console.log(err);
  }
}

export default function* watchCompareCar() {
  yield takeEvery(fetchCompareCarData.type, fetchCarsData);
}
