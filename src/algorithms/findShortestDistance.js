import { removeCarrotLocation, toggleCarrot } from "../slices/boardSlice";
import { store } from "../store";
import { dijkstra } from "./dijkstra";
//the idea behind this is to always assume there is a carrot. however, check if the carrot actually exists and if it doesnt,
//temporarly make a carrot at the start location and revert when algo is finished.
export function findShortestDistance() {
  const board = store.getState().board;
  const pathfindingAlgorithm =
    store.getState().header.currentPathfindingAlgorithm;
  var boardLock = false;
  const startLocation = board.startLocation;
  var output = { visitedNodesInOrder: [], nodesInShortestPathOrder: [] };
  //create a lock on the carrot location so you can turn it back into what it originally was.
  if (board.carrotLocation.row === -1) {
    boardLock = true;

    store.dispatch(
      toggleCarrot(board.boardArray[startLocation.row][startLocation.col])
    );
  }
  if (pathfindingAlgorithm === "dijkstra") {
    output = dijkstra();
  }
  //actual code here
  if (boardLock) {
    store.dispatch(
      toggleCarrot(board.boardArray[startLocation.row][startLocation.col])
    );
    store.dispatch(removeCarrotLocation());
  }
  return output;
}
