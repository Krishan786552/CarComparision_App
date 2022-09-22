import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  data: []
  // data: [],
};

export const fetchData = createAction("app/fetchCarsData");

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setData } = appSlice.actions;
export default appSlice.reducer;
