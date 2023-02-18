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
    setMouseIsLifted: (state) => {
      state.isPressed = false;
    },
    setWhatIsPressed: (state, action) => {
      state.whatIsPressed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMouseIsPressed, setMouseIsLifted, setWhatIsPressed } =
  mouseSlice.actions;
export const selectIsPressed = (state) => state.mouse.isPressed;
export const selectWhatIsPressed = (state) => state.mouse.whatIsPressed;
export default mouseSlice.reducer;
