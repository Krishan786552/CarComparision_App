import watchApp, { fetchCarsData } from "../../components/app/AppSaga";
import * as apis from "../../components/app/AppServices";
import { runSaga } from "redux-saga";

describe("test App saga", () => {
  it("test for fetchCarsData", async () => {
    const dispatched = [];
    jest
      .spyOn(apis, "getCarDataApi")
      .mockImplementationOnce(() => Promise.resolve("test"));
    
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      // getState: () => ({ counter: { value: 1 } }),
    }, fetchCarsData, 'test');

    expect(apis.getCarDataApi).toHaveBeenCalled();
  });

  it("test for fetchCarsData for no data", async () => {
    const dispatched = [];
    jest
      .spyOn(apis, "getCarDataApi")
      .mockImplementationOnce(() => Promise.resolve(null));
    
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      // getState: () => ({ counter: { value: 1 } }),
    }, fetchCarsData, 'test');

    expect(apis.getCarDataApi).toHaveBeenCalled();
  });

  it("test for fetchCarsData for error", async () => {
    const dispatched = [];
    jest
      .spyOn(apis, "getCarDataApi")
      .mockImplementationOnce(() => Promise.reject("test"));
    
    await runSaga({
      dispatch: (action) => dispatched.push(action),
      // getState: () => ({ counter: { value: 1 } }),
    }, fetchCarsData, 'test');

    expect(apis.getCarDataApi).toHaveBeenCalled();
  });

  it("test for watchApp", async () => {
    const dispatched = [];

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        // getState: () => ({ counter: { value: 1 } }),
      },
      watchApp,
      "test"
    );

    // expect(apis.getApi).toHaveBeenCalled();
  });
});
