import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDropdown: "",
  currentPathfindingAlgorithm: "",
  currentObstacle: "wall",
  bidirectional: false,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    updateCurrentDropdown: (state, action) => {
      state.currentDropdown = action.payload;
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
    toggleBidirectional: (state) => {
      state.bidirectional = !state.bidirectional;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCurrentDropdown,
  setPathfindingAlgorithm,
  setWall,
  setWeight,
  toggleBidirectional,
} = headerSlice.actions;

export const selectCurrentDropdown = (state) => state.header.currentDropdown;
export const selectCurrentPathfindingAlgorithm = (state) =>
  state.header.currentPathfindingAlgorithm;
export const selectCurrentObstacle = (state) => state.header.currentObstacle;
export const selectBidirectional = (state) => state.header.bidirectional;
export default headerSlice.reducer;
