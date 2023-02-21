import { createSlice } from "@reduxjs/toolkit";

const createNode = (row, col, startLocation, finishLocation) => {
  return {
    row,
    col,
    obstacle: "",
    isStart: row === startLocation.row && col === startLocation.col,
    isFinish: row === finishLocation.row && col === finishLocation.col,
    isCarrot: false,
    weight: 1,
    distance: Infinity,
    previousNode: null,
    isVisited: false,
  };
};

//these simply generate a location for a clean board.
const getStartingLocation = (width, height) => {
  return {
    row: Math.floor((height * 1) / 2),
    col: Math.floor((width * 1) / 4),
  };
};
const getFinishLocation = (width, height) => {
  return {
    row: Math.floor((height * 1) / 2),
    col: Math.floor((width * 3) / 4),
  };
};
const getCarrotLocation = (width, height) => {
  return {
    row: Math.floor((height * 1) / 2),
    col: Math.floor(width / 2),
  };
};
const generateBoard = (width, height) => {
  const boardArray = [];
  for (let row = 0; row < height; row++) {
    const currentRow = [];
    for (let col = 0; col < width; col++) {
      currentRow.push(
        createNode(
          row,
          col,
          getStartingLocation(width, height),
          getFinishLocation(width, height)
        )
      );
    }
    boardArray.push(currentRow);
  }
  return boardArray;
};
const removeObstacles = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      board[row][col].obstacle = "";
    }
  }
};
const initialWidth = Math.floor(window.innerWidth / 40);
const initialHeight = Math.floor(window.innerHeight / 45);

const initialState = {
  width: initialWidth,
  height: initialHeight,
  startLocation: getStartingLocation(initialWidth, initialHeight),
  finishLocation: getFinishLocation(initialWidth, initialHeight),
  carrotLocation: { row: -1, col: -1 },
  //a 2d array of nodes
  boardArray: generateBoard(initialWidth, initialHeight), //array of nodes
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
    //need to modify alias because redux uses a proxy before that
    addCarrot: (state) => {
      const boardAlias = state.boardArray;
      state.carrotLocation = getCarrotLocation(state.width, state.height);
      boardAlias[state.carrotLocation.row][
        state.carrotLocation.col
      ].isCarrot = true;
    },
    removeCarrot: (state) => {
      const boardAlias = state.boardArray;
      boardAlias[state.carrotLocation.row][
        state.carrotLocation.col
      ].isCarrot = false;
      state.carrotLocation = { row: -1, col: -1 };
    },
    // fix reset
    resetBoard: (state) => {
      const newWidth = Math.floor(window.innerWidth / 40);
      const newHeight = Math.floor(window.innerHeight / 45);

      state.width = newWidth;
      state.height = newHeight;
      state.boardArray = generateBoard(newWidth, newHeight);
      state.startLocation = getStartingLocation(newWidth, newHeight);
      state.finishLocation = getFinishLocation(newWidth, newHeight);
      state.carrotLocation = { row: -1, col: -1 };
    },
    clearBoard: (state) => {
      removeObstacles(state.boardArray);
    },
    //all it needs is the current node and current obstacle as {node, obstacle}
    toggleObstacle: (state, action) => {
      const currentNode = action.payload.node;
      const { row, col } = action.payload.node;

      const currentObstacle = action.payload.obstacle;
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
    },
    toggleFinish: (state, action) => {
      const { row, col } = action.payload;
      state.boardArray[row][col].isFinish =
        !state.boardArray[row][col].isFinish;
      state.finishLocation = { row, col };
    },
    toggleStart: (state, action) => {
      const { row, col } = action.payload;
      state.boardArray[row][col].isStart = !state.boardArray[row][col].isStart;
      state.startLocation = { row, col };
    },
    toggleCarrot: (state, action) => {
      const { row, col } = action.payload;
      state.boardArray[row][col].isCarrot =
        !state.boardArray[row][col].isCarrot;
      state.carrotLocation = { row, col };
    },
    removeCarrotLocation: (state) => {
      state.carrotLocation = { row: -1, col: -1 };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateBoardWidth,
  updateBoardHeight,
  addCarrot,
  removeCarrot,
  resetBoard,
  clearBoard,
  toggleObstacle,
  toggleFinish,
  toggleStart,
  toggleCarrot,
  removeCarrotLocation,
} = boardSlice.actions;
export const selectBoardWidth = (state) => state.board.width;
export const selectBoardHeight = (state) => state.board.height;
export const selectBoardArray = (state) => state.board.boardArray;
export const selectStartLocation = (state) => state.board.startLocation;
export const selectFinishLocation = (state) => state.board.finishLocation;
export const selectCarrotLocation = (state) => state.board.carrotLocation;
export default boardSlice.reducer;
