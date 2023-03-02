import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDropdown: "none",
  mobileMenuOpen: false,
  currentPathfindingAlgorithm: "",
  currentObstacle: "wall",
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
    setPathfindingAlgorithm: (state, action) => {
      state.currentPathfindingAlgorithm = action.payload;
    },
    setWall: (state) => {
      state.currentObstacle = "wall";
    },
    setWeight: (state) => {
      state.currentObstacle = "weight";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentDropdown,
  toggleMobileMenuOpen,
  setPathfindingAlgorithm,
  setWall,
  setWeight,
} = headerSlice.actions;

export const selectMobileMenuOpen = (state) => state.header.mobileMenuOpen;
export const selectCurrentDropdown = (state) => state.header.currentDropdown;
export const selectCurrentPathfindingAlgorithm = (state) =>
  state.header.currentPathfindingAlgorithm;
export const selectCurrentObstacle = (state) => state.header.currentObstacle;
export default headerSlice.reducer;
