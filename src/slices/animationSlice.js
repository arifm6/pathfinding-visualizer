import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAnimationSpeed: 25,
  isAnimating: false,
  hasAnimated: false,
};

export const animationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setAnimationSpeed: (state, action) => {
      state.currentAnimationSpeed = action.payload;
    },
    setIsAnimating: (state, action) => {
      state.isAnimating = action.payload;
    },
    setHasAnimated: (state, action) => {
      state.hasAnimated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAnimationSpeed, setIsAnimating, setHasAnimated } =
  animationSlice.actions;
export const selectCurrentAnimationSpeed = (state) =>
  state.animation.currentAnimationSpeed;
export const selectIsAnimating = (state) => state.animation.isAnimating;
export const selectHasAnimated = (state) => state.animation.hasAnimated;

export default animationSlice.reducer;
