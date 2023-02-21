import { clearBoard, toggleObstacle } from "../slices/boardSlice";
import { store } from "../store";

var board = store.getState().board.boardArray;

var currentObstacle = store.getState().header.currentObstacle;

export function randomMaze() {
  store.dispatch(clearBoard());

  board = store.getState().board.boardArray;
  currentObstacle = store.getState().header.currentObstacle;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      var randomNumber = Math.random();
      if (randomNumber <= (currentObstacle === "wall" ? 0.25 : 0.4)) {
        store.dispatch(
          toggleObstacle({ node: board[row][col], obstacle: currentObstacle })
        );
      }
    }
  }
}
