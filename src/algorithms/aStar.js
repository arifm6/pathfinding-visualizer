import { store } from "../store";
//https://raw.githubusercontent.com/bgrins/javascript-astar/master/astar.js
//tailored to my needs
const cloneDeep = require("clone-deep");

export function aStar(node1, node2, node3) {
  const startToCarr = getShortestPath(node1, node2);
  const carrotToEnd = getShortestPath(node2, node3);
  console.log(carrotToEnd);
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
      board[x][y].closed = false;
    }
  }
  const startingNode = board[node1.row][node1.col];
  const finishNode = board[node2.row][node2.col];
  startingNode.obstacle = "";
  finishNode.obstacle = "";
  startingNode.weight = 1;
  finishNode.weight = 1;

  const output = { visitedNodesInOrder: [], nodesInShortestPathOrder: [] };
  if (startingNode === finishNode) {
    return output;
  }
  //start point of new code
  var closest = false;
  var openHeap = getHeap();
  var closestNode = startingNode; // set the start node to be the closest if required
  startingNode.h = heuristic(startingNode, finishNode);
  openHeap.push(startingNode);

  while (openHeap.size() > 0) {
    // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
    var currentNode = openHeap.pop();
    // Normal case -- move currentNode from open to closed, process each of its neighbors.

    // End case -- result has been found, return the traced path.
    if (currentNode.isFinish) {
      output.nodesInShortestPathOrder = [...pathTo(currentNode)];
      return output;
    }
    currentNode.closed = true;

    // Find all neighbors for the current node.
    var neighbors = neighbours(board, currentNode);
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (neighbor.closed || neighbor.obstacle === "wall") {
        // Not a valid node to process, skip to next neighbor.
        continue;
      }
      output.visitedNodesInOrder.push(neighbor);
      // The g score is the shortest distance from start to current node.
      // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
      var gScore = currentNode.g + neighbor.weight;
      var beenVisited = neighbor.isVisited;
      if (!beenVisited || gScore < neighbor.g) {
        // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
        neighbor.visited = true;
        neighbor.previousNode = currentNode;
        neighbor.h = neighbor.h || heuristic(neighbor, finishNode);
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
        if (closest) {
          // If the neighbour is closer than the current closestNode or if it's equally close but has
          // a cheaper path than the current closest node then it becomes the closest node
          if (
            neighbor.h < closestNode.h ||
            (neighbor.h === closestNode.h && neighbor.g < closestNode.g)
          ) {
            closestNode = neighbor;
          }
        }

        if (!beenVisited) {
          // Pushing to heap will put it in proper place based on the 'f' value.
          openHeap.push(neighbor);
        } else {
          // Already seen the node, but since it has been rescored we need to reorder it in the heap
          openHeap.rescoreElement(neighbor);
        }
      }
    }
  }
}
function getHeap() {
  return new BinaryHeap(function (node) {
    return node.f;
  });
}
function BinaryHeap(scoreFunction) {
  this.content = [];
  this.scoreFunction = scoreFunction;
}
BinaryHeap.prototype = {
  push: function (element) {
    // Add the new element to the end of the array.
    this.content.push(element);

    // Allow it to sink down.
    this.sinkDown(this.content.length - 1);
  },
  pop: function () {
    // Store the first element so we can return it later.
    var result = this.content[0];
    // Get the element at the end of the array.
    var end = this.content.pop();
    // If there are any elements left, put the end element at the
    // start, and let it bubble up.
    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubbleUp(0);
    }
    return result;
  },
  remove: function (node) {
    var i = this.content.indexOf(node);

    // When it is found, the process seen in 'pop' is repeated
    // to fill up the hole.
    var end = this.content.pop();

    if (i !== this.content.length - 1) {
      this.content[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sinkDown(i);
      } else {
        this.bubbleUp(i);
      }
    }
  },
  size: function () {
    return this.content.length;
  },
  rescoreElement: function (node) {
    this.sinkDown(this.content.indexOf(node));
  },
  sinkDown: function (n) {
    // Fetch the element that has to be sunk.
    var element = this.content[n];

    // When at 0, an element can not sink any further.
    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      var parentN = ((n + 1) >> 1) - 1;
      var parent = this.content[parentN];
      // Swap the elements if the parent is greater.
      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent;
        // Update 'n' to continue at the new position.
        n = parentN;
      }
      // Found a parent that is less, no need to sink any further.
      else {
        break;
      }
    }
  },
  bubbleUp: function (n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) << 1;
      var child1N = child2N - 1;
      // This is used to store the new position of the element, if any.
      var swap = null;
      var child1Score;
      // If the first child exists (is inside the array)...
      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        child1Score = this.scoreFunction(child1);

        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);
        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // If the element needs to be moved, swap it, and continue.
      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      }
      // Otherwise, we are done.
      else {
        break;
      }
    }
  },
};
function heuristic(pos0, pos1) {
  var d1 = Math.abs(pos1.row - pos0.row);
  var d2 = Math.abs(pos1.col - pos0.col);
  return d1 + d2;
}
function pathTo(node) {
  var curr = node;
  var path = [];
  while (curr.previousNode) {
    path.unshift(curr);
    curr = curr.previousNode;
  }
  return path;
}

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
