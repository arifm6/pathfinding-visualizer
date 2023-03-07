import util from "../util";
import heuristic from "./heuristic";
var Heap = require("heap");

export default function biAStar(options) {
  options = options || {};
  this.heuristic = options.heuristic || heuristic.manhattan;
}

biAStar.prototype.findPath = function (
  startRow,
  startCol,
  endRow,
  endCol,
  grid
) {
  const biAStarResults = {
    visitedNodesInOrder: [],
    nodesInShortestPathOrder: [],
  };

  var cmp = function (nodeA, nodeB) {
      return nodeA.f - nodeB.f;
    },
    startOpenList = new Heap(cmp),
    endOpenList = new Heap(cmp),
    startNode = grid[startRow][startCol],
    endNode = grid[endRow][endCol],
    heuristic = this.heuristic,
    BY_START = 1,
    BY_END = 2,
    currentNode,
    neighbors,
    row,
    col,
    neighbor;
  if (startNode === endNode) {
    return biAStarResults;
  }
  startNode.g = 0;
  startNode.f = 0;
  startOpenList.push(startNode);
  startNode.opened = BY_START;

  endNode.g = 0;
  endNode.f = 0;
  endOpenList.push(endNode);
  endNode.opened = BY_END;
  while (!startOpenList.empty() && !endOpenList.empty()) {
    currentNode = startOpenList.pop();
    currentNode.closed = true;
    biAStarResults.visitedNodesInOrder.push(currentNode);
    var neighbors = util.getNeighbors(grid, currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      neighbor = neighbors[i];
      if (neighbor.closed || neighbor.obstacle === "wall") {
        continue;
      }
      if (neighbor.opened === BY_END) {
        biAStarResults.visitedNodesInOrder.push(neighbor);
        const temp = util.biTraceShortestPath(currentNode, neighbor);
        temp.push(endNode);

        biAStarResults.nodesInShortestPathOrder = [...temp];
        return biAStarResults;
      }
      row = neighbor.row;
      col = neighbor.col;
      var ng = currentNode.g + neighbor.weight;
      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h =
          neighbor.h ||
          heuristic(Math.abs(row - endRow), Math.abs(col - endCol));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previousNode = currentNode;

        if (!neighbor.opened) {
          startOpenList.push(neighbor);
          neighbor.opened = BY_START;
        } else {
          startOpenList.updateItem(neighbor);
        }
      }
    }
    currentNode = endOpenList.pop();
    currentNode.closed = true;
    biAStarResults.visitedNodesInOrder.push(currentNode);

    neighbors = util.getNeighbors(grid, currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (neighbor.closed || neighbor.obstacle === "wall") {
        continue;
      }
      if (neighbor.opened === BY_START) {
        biAStarResults.visitedNodesInOrder.push(neighbor);

        const temp = util.biTraceShortestPath(currentNode, neighbor).reverse();
        temp.push(endNode);

        biAStarResults.nodesInShortestPathOrder = [...temp];

        return biAStarResults;
      }
      row = neighbor.row;
      col = neighbor.col;
      var ng = currentNode.g + neighbor.weight;
      if (!neighbor.opened || ng < neighbor.g) {
        neighbor.g = ng;
        neighbor.h =
          neighbor.h ||
          heuristic(Math.abs(row - startRow), Math.abs(col - startCol));
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previousNode = currentNode;

        if (!neighbor.opened) {
          endOpenList.push(neighbor);
          neighbor.opened = BY_END;
        } else {
          endOpenList.updateItem(neighbor);
        }
      }
    }
  }
  return biAStarResults;
};
