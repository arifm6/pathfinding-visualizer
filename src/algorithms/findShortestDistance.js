import { updateCurrentAlgorithmOutput } from "../slices/headerSlice";
import { store } from "../store";
import { dijkstra } from "./dijkstra";
//the idea behind this is to always assume there is a carrot. however, check if the carrot actually exists and if it doesnt,
//temporarly make a carrot at the start location and revert when algo is finished.
export function findShortestDistance() {
  const board = store.getState().board;
  const pathfindingAlgorithm =
    store.getState().header.currentPathfindingAlgorithm;
  const startLocation = board.startLocation;
  const carrotLocation = board.carrotLocation;
  const finishLocation = board.finishLocation;
  var output = { visitedNodesInOrder: [], nodesInShortestPathOrder: [] };

  //if no carrot, node 1 = node 2
  const node1 = board.boardArray[startLocation.row][startLocation.col];
  const node2 =
    carrotLocation.row === -1
      ? board.boardArray[startLocation.row][startLocation.col]
      : board.boardArray[carrotLocation.row][carrotLocation.col];
  const node3 = board.boardArray[finishLocation.row][finishLocation.col];
  //create a lock on the carrot location so you can turn it back into what it originally was.
  if (pathfindingAlgorithm === "dijkstra") {
    output = dijkstra(node1, node2, node3);
  }
  //actual code here
  store.dispatch(updateCurrentAlgorithmOutput(output));
}
