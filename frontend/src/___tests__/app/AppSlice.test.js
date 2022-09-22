import reducer, { setData } from "../../components/app/AppSlice";

describe('unit Tests for reducer', () => {
  const initialState = {
    data: [],
  };
  it('test for setData', () => {
    expect(reducer(initialState, setData([100]))).toEqual({
      ...initialState,
      data: [100]
    })
  })
})
