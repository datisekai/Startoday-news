import { createSlice } from "@reduxjs/toolkit";

const CkSlice = createSlice({
  name: "ckeditor",
  initialState: {
    value: "",
  },
  reducers: {
    setData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default CkSlice.reducer;

export const { setData } = CkSlice.actions;
