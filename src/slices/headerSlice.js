import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDropdown: "none",
  mobileMenuOpen: false,
  currentPathfindingAlgorithm: "",
  currentObstacle: "wall",
  currentAnimationSpeed: 99,
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
    setWall: (state) => {
      state.currentObstacle = "wall";
    },
    setWeight: (state) => {
      state.currentObstacle = "weight";
    },
    setAnimationSpeed: (state, action) => {
      state.currentAnimationSpeed = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentDropdown,
  toggleMobileMenuOpen,
  addCarrotHeader,
  setWall,
  setWeight,
  setAnimationSpeed,
} = headerSlice.actions;

export const selectMobileMenuOpen = (state) => state.header.mobileMenuOpen;
export const selectCurrentDropdown = (state) => state.header.currentDropdown;
export const selectCurrentPathfindingAlgorithm = (state) =>
  state.header.currentPathfindingAlgorithm;
export const selectCurrentObstacle = (state) => state.header.currentObstacle;
export const selectCurrentAnimationSpeed = (state) =>
  state.header.currentAnimationSpeed;
export default headerSlice.reducer;
