import { updatePathfindingResults } from "../slices/boardSlice";
import util from "../util";
import { store } from "../store";
import aStar from "./aStar";
import heuristic from "./heuristic";
const cloneDeep = require("clone-deep");
function initBoard() {
  const boardState = store.getState().board;
  const grid = cloneDeep(boardState.boardArray);
  const startLocation = boardState.startLocation;
  const carrotLocation =
    boardState.carrotLocation.row === -1
      ? startLocation
      : boardState.carrotLocation;

  const finishLocation = boardState.finishLocation;
  grid[startLocation.row][startLocation.col].obstacle = "";
  grid[startLocation.row][startLocation.col].weight = 1;

  grid[carrotLocation.row][carrotLocation.col].obstacle = "";
  grid[carrotLocation.row][carrotLocation.col].weight = 1;

  grid[finishLocation.row][finishLocation.col].obstacle = "";
  grid[finishLocation.row][finishLocation.col].weight = 1;
  return { grid, startLocation, carrotLocation, finishLocation };
}
export function generatePathfindingResults() {
  var PF;
  var { grid, startLocation, carrotLocation, finishLocation } = initBoard();
  const currentPathfindingAlgorithm =
    store.getState().header.currentPathfindingAlgorithm;
  if (currentPathfindingAlgorithm === "dijkstra") {
    //dijkstra can be used as Astar without a heuristic.
    PF = new aStar({ heuristic: heuristic.none });
  } else if (currentPathfindingAlgorithm === "aStar") {
    PF = new aStar();
  } else {
    return;
  }
  var pathToCarrot = PF.findPath(
    startLocation.row,
    startLocation.col,
    carrotLocation.row,
    carrotLocation.col,
    grid
  );
  //temp using below because if we use the same references, it will be contaminated after first try.
  var temp = initBoard();
  var secondGrid = temp.grid;
  var secondCarrotLocation = temp.carrotLocation;
  var secondFinishLocation = temp.finishLocation;
  var pathToFinish = PF.findPath(
    secondCarrotLocation.row,
    secondCarrotLocation.col,
    secondFinishLocation.row,
    secondFinishLocation.col,
    secondGrid
  );
  var finalPath = util.combinePaths(pathToCarrot, pathToFinish);
  store.dispatch(updatePathfindingResults(finalPath));
}
