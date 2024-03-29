import { updatePathfindingResults } from "../slices/boardSlice";
import util from "../utils";
import { store } from "../store";
import aStar from "./aStar";
import dijkstra from "./dijkstra";
import greedyBestFirst from "./greedyBestFirst";
import breadthFirstSearch from "./breadthFirstSearch";
import biAStar from "./biAStar";
import biDijkstra from "./biDijkstra";
import biGreedyBestFirst from "./biGreedyBestFirst";
import biBreadthFirstSearch from "./biBreadthFirstSearch";
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

  const bidirectional = store.getState().header.bidirectional;
  var { grid, startLocation, carrotLocation } = initBoard();
  const currentPathfindingAlgorithm =
    store.getState().header.currentPathfindingAlgorithm;
  if (currentPathfindingAlgorithm === "dijkstra") {
    //dijkstra can be used as Astar without a heuristic.
    PF = bidirectional ? new biDijkstra() : new dijkstra();
  } else if (currentPathfindingAlgorithm === "aStar") {
    PF = bidirectional ? new biAStar() : new aStar();
  } else if (currentPathfindingAlgorithm === "greedyBestFirst") {
    PF = bidirectional ? new biGreedyBestFirst() : new greedyBestFirst();
  } else if (currentPathfindingAlgorithm === "breadthFirstSearch") {
    PF = bidirectional ? new biBreadthFirstSearch() : new breadthFirstSearch();
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
  finalPath.nodesInShortestPathOrder.unshift(
    grid[startLocation.row][startLocation.col]
  );
  store.dispatch(updatePathfindingResults(finalPath));
}
