import heuristic from "./heuristic";
import util from "../util";
var Heap = require("heap");

export default function aStar(options) {
  options = options || {};
  this.heuristic = options.heuristic || heuristic.manhattan;
}

aStar.prototype.findPath = function (startRow, startCol, endRow, endCol, grid) {
  var openList = new Heap(function (nodeA, nodeB) {
      return nodeA.f - nodeB.f;
    }),
    startNode = grid[startRow][startCol],
    endNode = grid[endRow][endCol],
    heuristic = this.heuristic;
  const aStarResults = {
    visitedNodesInOrder: [],
    nodesInShortestPathOrder: [],
  };
  if (startNode === endNode) {
    return aStarResults;
  }

  startNode.g = 0;
  startNode.f = 0;
  openList.push(startNode);
  startNode.opened = true;
  while (!openList.empty()) {
    const currentNode = openList.pop();
    currentNode.closed = true;
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
      if (neighbor.closed || neighbor.obstacle === "wall") {
        continue;
      }
      const ng = currentNode.g + neighbor.weight;
      //if havent checked neighber yet OR
      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h =
          neighbor.h ||
          heuristic(
            Math.abs(neighbor.row - endRow),
            Math.abs(neighbor.col - endCol)
          );
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previousNode = currentNode;

        if (!neighbor.opened) {
          openList.push(neighbor);
          neighbor.opened = true;
        } else {
          openList.updateItem(neighbor);
        }
      }
    }
  }
  return aStarResults;
};
