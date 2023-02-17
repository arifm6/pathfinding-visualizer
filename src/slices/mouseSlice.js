import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPressed: false,
  whatIsPressed: "",
};

export const mouseSlice = createSlice({
  name: "mouse",
  initialState,
  reducers: {
    setMouseIsPressed: (state) => {
      state.isPressed = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMouseIsPressed } = mouseSlice.actions;
export const selectIsPressed = (state) => state.isPressed;
export default mouseSlice.reducer;
