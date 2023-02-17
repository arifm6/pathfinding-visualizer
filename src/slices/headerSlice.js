import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDropdown: "none",
  mobileMenuOpen: false,
  currentPathfindingAlgorithm: "none",
  hasCarrot: false,
  currentObstacle: "wall",
  currentSpeed: "Fast",
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    updateCurrentDropdown: (state, action) => {
      state.currentDropdown = action.payload;
    },
    toggleMobileMenuOpen: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCurrentDropdown, toggleMobileMenuOpen } =
  headerSlice.actions;

export const selectMobileMenuOpen = (state) => state.header.mobileMenuOpen;
export const selectCurrentDropdown = (state) => state.header.currentDropdown;
export const selectCurrentObstacle = (state) => state.header.currentObstacle;
export default headerSlice.reducer;
