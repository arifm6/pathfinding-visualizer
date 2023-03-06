import util from "../util";
export default function breadthFirstSearch() {}

breadthFirstSearch.prototype.findPath = function (
  startRow,
  startCol,
  endRow,
  endCol,
  grid
) {
  var openList = [],
    startNode = grid[startRow][startCol],
    endNode = grid[endRow][endCol];
  const BFSResults = {
    visitedNodesInOrder: [],
    nodesInShortestPathOrder: [],
  };
  if (startNode === endNode) {
    return BFSResults;
  }
  openList.push(startNode);
  startNode.opened = true;
  while (openList.length) {
    const currentNode = openList.shift();
    currentNode.closed = true;
    BFSResults.visitedNodesInOrder.push(currentNode);
    if (currentNode === endNode) {
      //backtrack
      const temp = util.traceShortestPath(currentNode);
      BFSResults.nodesInShortestPathOrder = [...temp];
      return BFSResults;
    }
    const neighbors = util.getNeighbors(grid, currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.closed || neighbor.opened || neighbor.obstacle === "wall") {
        continue;
      }
      openList.push(neighbor);
      neighbor.opened = true;
      neighbor.previousNode = currentNode;
    }
  }
  return BFSResults;
};
