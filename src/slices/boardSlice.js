import { createSlice } from "@reduxjs/toolkit";

const createNode = (row, col) => {
  return {
    row,
    col,
    obstacle: "",
    weight: 1,
    distance: Infinity,
    previousNode: null,
    isVisited: false,
  };
};
const generateBoard = (width, height) => {
  const boardArray = [];
  for (let row = 0; row < height; row++) {
    const currentRow = [];
    for (let col = 0; col < width; col++) {
      currentRow.push(createNode(row, col));
    }
    boardArray.push(currentRow);
  }
  return boardArray;
};
const initialState = {
  width: Math.floor(window.innerWidth / 40),
  height: Math.floor(window.innerHeight / 45),
  startLocation: { row: 0, col: 0 },
  targetLocation: { row: 0, col: 1 },
  carrotLocation: { row: 0, col: 0 },
  //a 2d array of nodes
  boardArray: generateBoard(
    Math.floor(window.innerWidth / 40),
    Math.floor(window.innerHeight / 45)
  ), //array of nodes
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateBoardWidth: (state, action) => {
      state.width = action.payload;
    },
    updateBoardHeight: (state, action) => {
      state.height = action.payload;
    },
    resetBoard: (state) => {
      state.width = Math.floor(window.innerWidth / 40);
      state.height = Math.floor(window.innerHeight / 45);
      state.startLocation = { row: 0, col: 0 };
      state.targetLocation = { row: 0, col: 1 };
      state.carrotLocation = { row: 0, col: 0 };
      state.boardArray = generateBoard(state.width, state.height);
    },
    toggleObstacle: (state, action) => {
      const currentNode = action.payload.node;
      const { row, col } = action.payload.node;

      const currentObstacle = action.payload.obstacle;
      console.log(currentNode);
      console.log(row, col);
      console.log(currentObstacle);

      if (currentObstacle === "weight") {
        if (currentNode.obstacle !== "weight") {
          state.boardArray[row][col].obstacle = "weight";
          state.boardArray[row][col].weight = 16;
        } else {
          state.boardArray[row][col].obstacle = "";
          state.boardArray[row][col].weight = 1;
        }
      } else if (currentObstacle === "wall") {
        if (currentNode.obstacle !== "wall") {
          state.boardArray[row][col].obstacle = "wall";
          state.boardArray[row][col].weight = 1;
        } else {
          state.boardArray[row][col].obstacle = "";
        }
      }
      //state.boardArray[0][0].weight = "HI";
      //console.log(current(state));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateBoardWidth,
  updateBoardHeight,
  resetBoard,
  toggleObstacle,
} = boardSlice.actions;
export const selectBoardWidth = (state) => state.board.width;
export const selectBoardHeight = (state) => state.board.height;
export const selectBoardArray = (state) => state.board.boardArray;
export default boardSlice.reducer;
