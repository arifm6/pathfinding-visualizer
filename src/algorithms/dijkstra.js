import { clearBoard, toggleObstacle } from "../slices/boardSlice";
import { store } from "../store";

var board = store.getState().board.boardArray;

var currentObstacle = store.getState().header.currentObstacle;
var animationSpeed = store.getState().header.currentAnimationSpeed;
var timerCounter = 0;

//need to do this twice, once from start to carrot. and next from carrot to finish.
export function dijkstra() {}
