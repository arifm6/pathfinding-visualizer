import { clearBoard, toggleObstacle } from "../slices/boardSlice";
import { store } from "../store";

var currentObstacle = store.getState().header.currentObstacle;
var animationSpeed = store.getState().header.currentAnimationSpeed;
var timerCounter = 0;

const cloneDeep = require("clone-deep");
//need to do this twice, once from start to carrot. and next from carrot to finish.
export function dijkstra() {
  const startToCarr = startToCarrot();
  const carrotToEnd = carrotToFinish();

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

  return startToFinish;
}

function startToCarrot() {
  const boardState = store.getState().board;
  const board = cloneDeep(boardState.boardArray);

  const startingNode =
    board[boardState.startLocation.row][boardState.startLocation.col];
  const carrotNode =
    board[boardState.carrotLocation.row][boardState.carrotLocation.col];
  startingNode.obstacle = "";
  carrotNode.obstacle = "";
  startingNode.weight = 1;
  carrotNode.weight = 1;
  //start by visiting nearest neighbours and updating their path.
  //store visitedNodes
  const visitedNodesInOrder = [];
  startingNode.distance = 0;
  //VISIT NEIGHBOURS AND THEN POP THEM OUT OF THE ARRAY WHEN THEY ARE VISITED AND VISIT THEIR NEIGHBOURS.
  const unvisitedNodes = getAllNodes(board);
  while (unvisitedNodes.length) {
    //first sort unvisited nodes
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

    //then visit neighbours and update distance.
    const currentNode = unvisitedNodes.shift();

    //if the current node is a wall, skip it
    if (currentNode.obstacle === "wall") {
      continue;
    }
    //remember that if the current nodes distance = infinity, then you must have went through the sorted unvisited nodes array and still reached a value that is infinity so you are trapped.
    if (currentNode.distance === Infinity) {
      return {
        visitedNodesInOrder,
        nodesInShortestPathOrder: nodesInShortestPath(carrotNode),
      };
    }
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === carrotNode) {
      return {
        visitedNodesInOrder,
        nodesInShortestPathOrder: nodesInShortestPath(carrotNode),
      };
    }

    updateUnvisitedNeighbours(board, currentNode);
  }
  // if the finish node is a wall node, this accounts for that
  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder: nodesInShortestPath(carrotNode.previousNode),
  };
}

function carrotToFinish() {
  const boardState = store.getState().board;
  const board = cloneDeep(boardState.boardArray);

  const carrotNode =
    board[boardState.carrotLocation.row][boardState.carrotLocation.col];
  const finishNode =
    board[boardState.finishLocation.row][boardState.finishLocation.col];
  carrotNode.obstacle = "";
  finishNode.obstacle = "";
  carrotNode.weight = 1;
  finishNode.weight = 1;
  //start by visiting nearest neighbours and updating their path.
  //store visitedNodes
  const visitedNodesInOrder = [];
  carrotNode.distance = 0;
  //VISIT NEIGHBOURS AND THEN POP THEM OUT OF THE ARRAY WHEN THEY ARE VISITED AND VISIT THEIR NEIGHBOURS.
  const unvisitedNodes = getAllNodes(board);
  while (unvisitedNodes.length) {
    //first sort unvisited nodes
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

    //then visit neighbours and update distance.
    const currentNode = unvisitedNodes.shift();

    //if the current node is a wall, skip it
    if (currentNode.obstacle === "wall") {
      continue;
    }
    //remember that if the current nodes distance = infinity, then you must have went through the sorted unvisited nodes array and still reached a value that is infinity so you are trapped.
    if (currentNode.distance === Infinity) {
      return {
        visitedNodesInOrder,
        nodesInShortestPathOrder: nodesInShortestPath(finishNode),
      };
    }
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) {
      return {
        visitedNodesInOrder,
        nodesInShortestPathOrder: nodesInShortestPath(finishNode),
      };
    }

    updateUnvisitedNeighbours(board, currentNode);
  }
  // if the finish node is a wall node, this accounts for that
  return {
    visitedNodesInOrder,
    nodesInShortestPathOrder: nodesInShortestPath(finishNode.previousNode),
  };
}
function getAllNodes(board) {
  const allNodes = [];
  for (const row of board) {
    for (const col of row) {
      allNodes.push(col);
    }
  }
  return allNodes;
}
//set the distance of all unvisited neighbours
function updateUnvisitedNeighbours(board, currentNode) {
  //get all unvisited neighbours first.
  const { row, col } = currentNode;
  const unvisitedNeighbours = [];
  if (row > 0) unvisitedNeighbours.push(board[row - 1][col]);
  if (row < board.length - 1) unvisitedNeighbours.push(board[row + 1][col]);
  if (col > 0) unvisitedNeighbours.push(board[row][col - 1]);
  if (col < board[row].length - 1)
    unvisitedNeighbours.push(board[row][col + 1]);
  //delete all that are visited.

  for (let i = 0; i < unvisitedNeighbours.length; i++) {
    if (
      unvisitedNeighbours[i].distance >
      currentNode.distance + unvisitedNeighbours[i].weight
    ) {
      unvisitedNeighbours[i].distance =
        currentNode.distance + unvisitedNeighbours[i].weight;
      unvisitedNeighbours[i].previousNode = currentNode;
    }
  }
}

export function nodesInShortestPath(finishNode) {
  const nodesInShortestPathOrder = [];
  //go through like a linked list.
  let currentNode = finishNode;
  while (currentNode != null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
