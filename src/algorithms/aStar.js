import { store } from "../store";
//https://briangrinstead.com/blog/astar-search-algorithm-in-javascript/
//tailored to my needs
const cloneDeep = require("clone-deep");

export function aStar(node1, node2, node3) {
  const startToCarr = getShortestPath(node1, node2);
  const carrotToEnd = getShortestPath(node2, node3);
  const startToFinish = {
    visitedNodesInOrder: {
      startToCarrot: startToCarr.visitedNodesInOrder,
      carrotToFinish: carrotToEnd.visitedNodesInOrder,
    },
    nodesInShortestPathOrder: [
      ...startToCarr.nodesInShortestPathOrder,
      ...carrotToEnd.nodesInShortestPathOrder,
    ],
  };
  return startToFinish;
}

function getShortestPath(node1, node2) {
  const boardState = store.getState().board;

  const board = cloneDeep(boardState.boardArray);
  for (var x = 0; x < board.length; x++) {
    for (var y = 0; y < board[x].length; y++) {
      board[x][y].f = 0;
      board[x][y].g = 0;
      board[x][y].h = 0;
      board[x][y].debug = "";
    }
  }
  const startingNode = board[node1.row][node1.col];
  const finishNode = board[node2.row][node2.col];
  startingNode.obstacle = "";
  finishNode.obstacle = "";
  startingNode.weight = 1;
  finishNode.weight = 1;
  var openList = [];
  var closedList = [];
  openList.push(startingNode);
  const output = { visitedNodesInOrder: [], nodesInShortestPathOrder: [] };
  if (startingNode === finishNode) {
    return output;
  }

  while (openList.length > 0) {
    // Grab the lowest f(x) to process next
    var lowInd = 0;
    for (var i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowInd].f) {
        lowInd = i;
      }
    }
    var currentNode = openList[lowInd];
    // End case -- result has been found, return the traced path
    if (currentNode.isFinish) {
      var curr = currentNode;
      var ret = [];
      while (curr.previousNode) {
        ret.push(curr);
        curr = curr.previousNode;
      }
      output.nodesInShortestPathOrder = [...ret.reverse()];
      return output;
      //return ret.reverse();
    }

    // Normal case -- move currentNode from open to closed, process each of its neighbors
    removeGraphNode(openList, currentNode);
    closedList.push(currentNode);

    var neighbors = neighbours(board, currentNode);
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      if (
        findGraphNode(closedList, neighbor) !== -1 ||
        neighbor.obstacle === "wall"
      ) {
        // not a valid node to process, skip to next neighbor
        continue;
      }
      // g score is the shortest distance from start to current node, we need to check if
      //   the path we have arrived at this neighbor is the shortest one we have seen yet
      var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
      var gScoreIsBest = false;
      if (findGraphNode(openList, neighbor) === -1) {
        // This the the first time we have arrived at this node, it must be the best
        // Also, we need to take the h (heuristic) score since we haven't done so yet

        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor, finishNode);
        openList.push(neighbor);
        output.visitedNodesInOrder.push(neighbor);
      } else if (gScore < neighbor.g) {
        // We have already seen the node, but last time it had a worse g (distance from start)
        gScoreIsBest = true;
      }
      if (gScoreIsBest) {
        // Found an optimal (so far) path to this node.   Store info on how we got here and
        //  just how good it really is...
        neighbor.previousNode = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.debug =
          "F: " +
          neighbor.f +
          "<br />G: " +
          neighbor.g +
          "<br />H: " +
          neighbor.h;
      }
    }
  }
}
function removeGraphNode(list, node) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === node) {
      list.splice(i, 1);
    }
  }
}
function findGraphNode(list, node) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === node) {
      return i;
    }
  }
  return -1;
}
function heuristic(pos0, pos1) {
  // This is the Manhattan distance
  var d1 = Math.abs(pos1.row - pos0.row);
  var d2 = Math.abs(pos1.col - pos0.col);
  return d1 + d2;
}

//gets the neighbours and returns them as an array
function neighbours(grid, node) {
  var ret = [];
  var x = node.row;
  var y = node.col;

  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
  }
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
  }
  if (grid[x][y - 1] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
  }
  if (grid[x][y + 1] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
  }
  return ret;
}
