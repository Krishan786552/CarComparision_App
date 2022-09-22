import { put, takeEvery, call, select} from "redux-saga/effects";
import { fetchData, setData } from "./AppSlice";
import { getCarDataApi } from "./AppServices";

// fetch all cars data
export function* fetchCarsData() {
  try {
    const data = yield call(getCarDataApi);
    if (data) {
      yield put(setData(data));
    }
  } catch(err) {
    console.log(err);
  }
}

export default function* watchApp() {
  yield takeEvery(fetchData.type, fetchCarsData);
}
