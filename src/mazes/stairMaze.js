import { setIsAnimating } from "../slices/animationSlice";
import { toggleObstacle } from "../slices/boardSlice";
import { store } from "../store";

var board = store.getState().board.boardArray;
var currentObstacle = store.getState().header.currentObstacle;

export function stairMaze() {
  board = store.getState().board.boardArray;
  currentObstacle = store.getState().header.currentObstacle;
  var animationSpeed = store.getState().animation.currentAnimationSpeed;
  var animationSpeed = animationSpeed * 2;
  var timerCounter = 0;
  var rows = store.getState().board.height - 1;
  var cols = store.getState().board.width - 1;
  var row = rows - 1;
  var direction = 1;
  store.dispatch(setIsAnimating(true));
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
    store.dispatch(setIsAnimating(false));
  }, animationSpeed * timerCounter);
}
