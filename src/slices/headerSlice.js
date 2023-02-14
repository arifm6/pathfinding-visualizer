import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDropdown: "none",
  mobileMenuOpen: false,
  pathfindingAlgorithms: [
    "Dijkstra's",
    "A*",
    "Swarm",
    "Breadth-First Search",
    "Depth-First Search",
  ],
  currentPathfindingAlgorithm: "none",
  mazeAlgorithms: ["Recursive Division", "Random", "Stair"],
  currentMazeAlgorithm: "none",
  obstacles: ["Wall", "Weight"],
  currentObstacle: "Wall",
  speeds: ["Fast", "Medium", "Slow"],
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
export const selectPathfindingAlgorithms = (state) =>
  state.header.pathfindingAlgorithms;
export const selectMazeAlgorithms = (state) => state.header.mazeAlgorithms;
export const selectObstacle = (state) => state.header.obstacles;
export const selectSpeed = (state) => state.header.speeds;
export default headerSlice.reducer;
