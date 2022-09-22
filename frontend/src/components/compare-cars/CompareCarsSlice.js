import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  compareCarsData: {},
  dropdownDetails: []
};

export const fetchCompareCarData = createAction("compare/fetchCompareCarData");

export const compareCarSlice = createSlice({
  name: "compareCar",
  initialState,
  reducers: {
    setDropDownInitialValues: (state, action) => {
      state.dropdownDetails = action.payload;
    },
    setDropDownValueByKey: (state, action) => {
      const { key, itemId, value, name, data, type='add' } = action.payload;
      // console.log('------------', state.dropdownDetails[0]);
      const index = state.dropdownDetails.findIndex(i => i.key === key);
      const item = state.dropdownDetails[index];
      item.value = value;
      item.itemId = itemId || item.itemId;
      item.name = name;
      item.data = data;
      if (type === 'remove' && state?.compareCarsData && state?.compareCarsData?.length) {
        state.compareCarsData = state?.compareCarsData?.filter((itm) => itm.id !== item.itemId);
      }
    },
    setData: (state, action) => {
      state.compareCarsData = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setDropDownInitialValues, setDropDownValueByKey, setData } = compareCarSlice.actions;
export default compareCarSlice.reducer;
