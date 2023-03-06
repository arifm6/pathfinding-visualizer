import util from "../util";
export default function biBreadthFirstSearch() {}

biBreadthFirstSearch.prototype.findPath = function (
  startRow,
  startCol,
  endRow,
  endCol,
  grid
) {
  var startNode = grid[startRow][startCol],
    endNode = grid[endRow][endCol],
    startOpenList = [],
    endOpenList = [],
    neighbors,
    currentNode,
    BY_START = 1,
    BY_END = 2;
  const biBFSResults = {
    visitedNodesInOrder: [],
    nodesInShortestPathOrder: [],
  };
  if (startNode === endNode) {
    return biBFSResults;
  }
  startOpenList.push(startNode);
  startNode.opened = true;
  endNode.by = BY_START;
  endOpenList.push(endNode);
  endNode.opened = true;
  endNode.by = BY_END;
  while (startOpenList.length && endOpenList.length) {
    //startopenlist first
    currentNode = startOpenList.shift();
    currentNode.closed = true;
    biBFSResults.visitedNodesInOrder.push(currentNode);
    neighbors = util.getNeighbors(grid, currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.closed || neighbor.obstacle === "wall") {
        continue;
      }
      if (neighbor.opened) {
        if (neighbor.by === BY_END) {
          biBFSResults.visitedNodesInOrder.push(neighbor);
          const temp = util.biTraceShortestPath(currentNode, neighbor);
          console.log(temp);

          biBFSResults.nodesInShortestPathOrder = [...temp];
          return biBFSResults;
        }
        continue;
      }
      startOpenList.push(neighbor);
      neighbor.previousNode = currentNode;
      neighbor.opened = true;
      neighbor.by = BY_START;
    }
    currentNode = endOpenList.shift();
    currentNode.closed = true;
    biBFSResults.visitedNodesInOrder.push(currentNode);
    neighbors = util.getNeighbors(grid, currentNode);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.closed || neighbor.obstacle === "wall") {
        continue;
      }
      if (neighbor.opened) {
        if (neighbor.by === BY_START) {
          biBFSResults.visitedNodesInOrder.push(neighbor);
          const temp = util
            .biTraceShortestPath(currentNode, neighbor)
            .reverse();

          biBFSResults.nodesInShortestPathOrder = [...temp];
          return biBFSResults;
        }
        continue;
      }
      endOpenList.push(neighbor);
      neighbor.previousNode = currentNode;
      neighbor.opened = true;
      neighbor.by = BY_END;
    }
  }
  return biBFSResults;
};
