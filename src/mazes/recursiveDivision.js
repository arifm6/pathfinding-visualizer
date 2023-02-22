import { findShortestDistance } from "../algorithms/findShortestDistance";
import { clearBoard, toggleObstacle } from "../slices/boardSlice";
import { setIsAnimating } from "../slices/headerSlice";
import { store } from "../store";

var board = store.getState().board.boardArray;

var currentObstacle = store.getState().header.currentObstacle;
var animationSpeed = store.getState().header.currentAnimationSpeed;
var timerCounter = 0;
const HORIZONTAL = "horizontal",
  VERTICAL = "vertical";
function chooseOrientation(width, height) {
  if (width < height) {
    //HORIZONTAL SKEW
    return VERTICAL;
  } else if (height < width) {
    return HORIZONTAL;
    //VERTICAL SKEW
  } else {
    return Math.random() > 0.5 ? HORIZONTAL : VERTICAL;

    //RANDOM
  }
}

function divide(rowStart, rowEnd, colStart, colEnd, orientation) {
  //for right/bottom recusrive subfield
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    for (let col = colStart - 1; col <= colEnd + 1; col++) {
      if (col !== colRandom) {
        timerCounter++;

        setTimeout(() => {
          store.dispatch(
            toggleObstacle({
              node: board[currentRow][col],
              obstacle: currentObstacle,
            })
          );
        }, animationSpeed * timerCounter);
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      divide(rowStart, currentRow - 2, colStart, colEnd, orientation);
    } else {
      divide(rowStart, currentRow - 2, colStart, colEnd, "vertical");
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      divide(currentRow + 2, rowEnd, colStart, colEnd, orientation);
    } else {
      divide(currentRow + 2, rowEnd, colStart, colEnd, "vertical");
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    for (let row = rowStart - 1; row <= rowEnd + 1; row++) {
      if (row !== rowRandom) {
        timerCounter++;

        setTimeout(() => {
          store.dispatch(
            toggleObstacle({
              node: board[row][currentCol],
              obstacle: currentObstacle,
            })
          );
        }, animationSpeed * timerCounter);
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      divide(rowStart, rowEnd, colStart, currentCol - 2, "horizontal");
    } else {
      divide(rowStart, rowEnd, colStart, currentCol - 2, orientation);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      divide(rowStart, rowEnd, currentCol + 2, colEnd, "horizontal");
    } else {
      divide(rowStart, rowEnd, currentCol + 2, colEnd, orientation);
    }
  }
}

function horizontalDivide(rowStart, rowEnd, colStart, colEnd, orientation) {
  //for right/bottom recusrive subfield
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    for (let col = colStart - 1; col <= colEnd + 1; col++) {
      if (col !== colRandom) {
        timerCounter++;

        setTimeout(() => {
          store.dispatch(
            toggleObstacle({
              node: board[currentRow][col],
              obstacle: currentObstacle,
            })
          );
        }, animationSpeed * timerCounter);
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      horizontalDivide(rowStart, currentRow - 2, colStart, colEnd, orientation);
    } else {
      horizontalDivide(
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        "horizontal"
      );
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      horizontalDivide(currentRow + 2, rowEnd, colStart, colEnd, orientation);
    } else {
      horizontalDivide(currentRow + 2, rowEnd, colStart, colEnd, "vertical");
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    for (let row = rowStart - 1; row <= rowEnd + 1; row++) {
      if (row !== rowRandom) {
        timerCounter++;

        setTimeout(() => {
          store.dispatch(
            toggleObstacle({
              node: board[row][currentCol],
              obstacle: currentObstacle,
            })
          );
        }, animationSpeed * timerCounter);
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      horizontalDivide(
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal"
      );
    } else {
      horizontalDivide(
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        "horizontal"
      );
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      horizontalDivide(rowStart, rowEnd, currentCol + 2, colEnd, "horizontal");
    } else {
      horizontalDivide(rowStart, rowEnd, currentCol + 2, colEnd, orientation);
    }
  }
}
function verticalDivide(rowStart, rowEnd, colStart, colEnd, orientation) {
  //for right/bottom recusrive subfield
  if (rowEnd < rowStart || colEnd < colStart) {
    return;
  }
  if (orientation === "horizontal") {
    let possibleRows = [];
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number);
    }
    let possibleCols = [];
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    for (let col = colStart - 1; col <= colEnd + 1; col++) {
      if (col !== colRandom) {
        timerCounter++;

        setTimeout(() => {
          store.dispatch(
            toggleObstacle({
              node: board[currentRow][col],
              obstacle: currentObstacle,
            })
          );
        }, animationSpeed * timerCounter);
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      verticalDivide(rowStart, currentRow - 2, colStart, colEnd, orientation);
    } else {
      verticalDivide(rowStart, currentRow - 2, colStart, colEnd, "vertical");
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      verticalDivide(currentRow + 2, rowEnd, colStart, colEnd, "vertical");
    } else {
      verticalDivide(currentRow + 2, rowEnd, colStart, colEnd, "vertical");
    }
  } else {
    let possibleCols = [];
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number);
    }
    let possibleRows = [];
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number);
    }
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let currentCol = possibleCols[randomColIndex];
    let rowRandom = possibleRows[randomRowIndex];
    for (let row = rowStart - 1; row <= rowEnd + 1; row++) {
      if (row !== rowRandom) {
        timerCounter++;

        setTimeout(() => {
          store.dispatch(
            toggleObstacle({
              node: board[row][currentCol],
              obstacle: currentObstacle,
            })
          );
        }, animationSpeed * timerCounter);
      }
    }

    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      verticalDivide(rowStart, rowEnd, colStart, currentCol - 2, "vertical");
    } else {
      verticalDivide(rowStart, rowEnd, colStart, currentCol - 2, orientation);
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      verticalDivide(rowStart, rowEnd, currentCol + 2, colEnd, "horizontal");
    } else {
      verticalDivide(rowStart, rowEnd, currentCol + 2, colEnd, orientation);
    }
  }
}

export function recursiveDivision(skew = "") {
  store.dispatch(clearBoard());
  store.dispatch(setIsAnimating(true));
  board = store.getState().board.boardArray;
  currentObstacle = store.getState().header.currentObstacle;
  animationSpeed = store.getState().header.currentAnimationSpeed;
  var boardSize = {
    rows: store.getState().board.height,
    cols: store.getState().board.width,
  };
  timerCounter = 0;
  for (let row = 0; row < board.length; row++) {
    timerCounter++;
    setTimeout(() => {
      store.dispatch(
        toggleObstacle({ node: board[row][0], obstacle: currentObstacle })
      );
      store.dispatch(
        toggleObstacle({
          node: board[board.length - row - 1][board[0].length - 1],
          obstacle: currentObstacle,
        })
      );
    }, timerCounter * animationSpeed);
  }
  for (let col = 0; col < board[0].length; col++) {
    timerCounter++;
    setTimeout(() => {
      store.dispatch(
        toggleObstacle({ node: board[0][col], obstacle: currentObstacle })
      );
      store.dispatch(
        toggleObstacle({
          node: board[board.length - 1][board[0].length - col - 1],
          obstacle: currentObstacle,
        })
      );
    }, timerCounter * animationSpeed);
  }
  if (skew === "horizontal") {
    horizontalDivide(
      2,
      boardSize.rows - 3,
      2,
      boardSize.cols - 3,
      chooseOrientation(boardSize.cols, boardSize.rows)
    );
  } else if (skew === "vertical") {
    verticalDivide(
      2,
      boardSize.rows - 3,
      2,
      boardSize.cols - 3,
      chooseOrientation(boardSize.cols, boardSize.rows)
    );
  } else {
    divide(
      2,
      boardSize.rows - 3,
      2,
      boardSize.cols - 3,
      chooseOrientation(boardSize.cols, boardSize.rows)
    );
  }
  setTimeout(() => {
    store.dispatch(setIsAnimating(false));
    findShortestDistance();
  }, timerCounter * animationSpeed);
}
