import { findShortestDistance } from "../algorithms/findShortestDistance";
import { clearBoard, toggleObstacle } from "../slices/boardSlice";
import { store } from "../store";

var board = store.getState().board.boardArray;
var currentObstacle = store.getState().header.currentObstacle;

export function stairMaze() {
  board = store.getState().board.boardArray;
  currentObstacle = store.getState().header.currentObstacle;
  var animationSpeed = store.getState().header.currentAnimationSpeed;
  var timerCounter = 0;
  var rows = store.getState().board.height - 1;
  var cols = store.getState().board.width - 1;
  var row = rows - 1;
  var direction = 1;
  for (let col = 1; col < cols; col++) {
    timerCounter++;
    setTimeout(() => {
      store.dispatch(
        toggleObstacle({ node: board[row][col], obstacle: currentObstacle })
      );
      row -= direction;
      if (row === 1 || row === rows - 1) {
        direction *= -1;
      }
    }, animationSpeed * timerCounter);
  }
  setTimeout(() => {
    findShortestDistance();
  }, animationSpeed * timerCounter);
}
