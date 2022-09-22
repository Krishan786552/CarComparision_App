import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import AppSlice from "./components/app/AppSlice";

const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

const staticReducers = {
  app: AppSlice,
};

const sagaMiddleware = createSagaMiddleware();
const sagaRun = (sagaObj) => {
  const values = Object.values(sagaObj);
  sagaMiddleware.run(function* () {
    yield all(values.map((item) => item()));
  });
};

export default function configureAppStore(preloadedState) {
  // console.log(createReducer({}));

  let store = configureStore({
    reducer: createReducer(),
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(logger)
        .concat(sagaMiddleware),
    devTools: true,
  });

  store.asyncReducers = {};
  store.injectReducer = function (key, reducer) {
    if (!store.asyncReducers[key]) {
      store.asyncReducers[key] = reducer;
      store.replaceReducer(createReducer(store.asyncReducers));
    }
  };

  store.asyncSagas = {};

  store.injectSaga = function (key, saga) {
    if (!store.asyncSagas[key]) {
      store.asyncSagas[key] = saga;
      sagaRun(store.asyncSagas);
    }
  };

  return store;
}

const createReducer = (asyncReducers) => {
  console.log(asyncReducers);

  const rootReducer = combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
  return rootReducer;
};
