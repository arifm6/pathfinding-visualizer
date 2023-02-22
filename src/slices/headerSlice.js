import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDropdown: "none",
  mobileMenuOpen: false,
  currentPathfindingAlgorithm: "",
  currentObstacle: "wall",
  currentAnimationSpeed: 25,
  isAnimating: false,
  hasAnimated: false,
  currentAlgorithmOutput: {
    visitedNodesInOrder: { startToCarrot: [], carrotToFinish: [] },
    nodesInShortestPathOrder: [],
  },
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
    updateCurrentAlgorithmOutput: (state, action) => {
      state.currentAlgorithmOutput = action.payload;
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
    setIsAnimating: (state, action) => {
      state.isAnimating = action.payload;
    },
    setHasAnimated: (state, action) => {
      state.hasAnimated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentDropdown,
  toggleMobileMenuOpen,
  setPathfindingAlgorithm,
  updateCurrentAlgorithmOutput,
  setWall,
  setWeight,
  setAnimationSpeed,
  setIsAnimating,
  setHasAnimated,
} = headerSlice.actions;

export const selectMobileMenuOpen = (state) => state.header.mobileMenuOpen;
export const selectCurrentDropdown = (state) => state.header.currentDropdown;
export const selectCurrentPathfindingAlgorithm = (state) =>
  state.header.currentPathfindingAlgorithm;
export const selectCurrentObstacle = (state) => state.header.currentObstacle;
export const selectCurrentAnimationSpeed = (state) =>
  state.header.currentAnimationSpeed;
export const selectIsAnimating = (state) => state.header.isAnimating;
export const selectHasAnimated = (state) => state.header.hasAnimated;
export default headerSlice.reducer;
