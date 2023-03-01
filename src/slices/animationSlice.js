import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export default animationSlice.reducer;
