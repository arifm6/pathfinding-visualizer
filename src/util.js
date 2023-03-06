export default {
  getAllNodes: function (grid) {
    const allNodes = [];
    for (const row of grid) {
      for (const col of row) {
        allNodes.push(col);
      }
    }
    return allNodes;
  },
  //nodeX = X position of node etc
  getNeighbors: function (grid, node) {
    var neighbors = [];
    var row = node.row;
    var col = node.col;

    if (grid[row - 1]) {
      neighbors.push(grid[row - 1][col]);
    }

    if (grid[row][col + 1]) {
      neighbors.push(grid[row][col + 1]);
    }
    if (grid[row + 1]) {
      neighbors.push(grid[row + 1][col]);
    }
    if (grid[row][col - 1]) {
      neighbors.push(grid[row][col - 1]);
    }
    return neighbors;
  },
  traceShortestPath: function (endNode) {
    var curr = endNode;
    var ret = [];
    while (curr.previousNode) {
      ret.push(curr);
      curr = curr.previousNode;
    }
    return ret.reverse();
  },
  //node is heading towards end, neighbor towards beginning
  biTraceShortestPath: function (node, neighbor) {
    //combine the paths
    var curr = node;
    var pathToEnd = [];
    while (curr.previousNode) {
      pathToEnd.push(curr);
      curr = curr.previousNode;
    }
    pathToEnd.reverse();
    curr = neighbor;
    while (curr.previousNode) {
      pathToEnd.push(curr);
      curr = curr.previousNode;
    }
    return pathToEnd;
  },
  //combine paths for start to carrot and carrot to finish
  combinePaths: function (startToCarrot, carrotToFinish) {
    return {
      visitedNodesInOrder: {
        startToCarrot: startToCarrot.visitedNodesInOrder,
        carrotToFinish: carrotToFinish.visitedNodesInOrder,
      },
      nodesInShortestPathOrder: [
        ...startToCarrot.nodesInShortestPathOrder,
        ...carrotToFinish.nodesInShortestPathOrder,
      ],
    };
  },
};
