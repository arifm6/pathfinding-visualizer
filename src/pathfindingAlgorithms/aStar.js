import heuristic from "./heuristic";
import util, { getNeighbors } from "../util";
var Heap = require("heap");

export default function aStar(options) {
  options = options || {};
  this.heuristic = options.heuristic || heuristic.manhattan;
}

aStar.prototype.findPath = function (startRow, startCol, endRow, endCol, grid) {
  for (const row of grid) {
    for (const col of row) {
      col.g = Infinity;
      col.f = Infinity;
      col.previousNode = null;
    }
  }
  var startNode = grid[startRow][startCol],
    endNode = grid[endRow][endCol],
    heuristic = this.heuristic;
  const aStarResults = {
    visitedNodesInOrder: [],
    nodesInShortestPathOrder: [],
  };
  if (startRow === endRow && startCol === endCol) {
    return aStarResults;
  }
  startNode.g = 0;
  startNode.f = 0;
  startNode.h = heuristic(
    Math.abs(startRow - endRow),
    Math.abs(startCol - endCol)
  );
  const unvisitedNodes = util.getAllNodes(grid);
  while (unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
    const currentNode = unvisitedNodes.shift();
    //if current is a wall, skip remember to make it not a wall if start is a wall
    if (currentNode.obstacle === "wall") {
      continue;
    }
    currentNode.isVisited = true;
    aStarResults.visitedNodesInOrder.push(currentNode);
    if (currentNode === endNode) {
      //backtrack
      const temp = util.traceShortestPath(currentNode);
      aStarResults.nodesInShortestPathOrder = [...temp];
      return aStarResults;
    }
    const neighbors = util.getNeighbors(grid, currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.isVisited) {
        continue;
      }
      const ng = currentNode.g + neighbor.weight;
      //if havent checked neighber yet OR
      if (neighbor.f === Infinity || ng < currentNode.g + neighbor.weight) {
        neighbor.g = ng;
        neighbor.h =
          neighbor.h ||
          heuristic(
            Math.abs(neighbor.row - endRow),
            Math.abs(neighbor.col - endCol)
          );
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previousNode = currentNode;
      }
    }
  }
};
