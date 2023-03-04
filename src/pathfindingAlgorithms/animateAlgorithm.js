import { setIsAnimating } from "../slices/animationSlice";
import { store } from "../store";

var animationSpeed = store.getState().animation.currentAnimationSpeed;
export function animateAlgorithm() {
  var { nodesInShortestPathOrder, visitedNodesInOrder } =
    store.getState().board.pathfindingResults;
  store.dispatch(setIsAnimating(true));
  animationSpeed = store.getState().animation.currentAnimationSpeed;
  document.querySelectorAll(".node").forEach((node) => {
    node.classList.remove("carrot-to-finish");
    node.classList.remove("start-to-carrot");
    node.classList.remove("start-to-carrot-instant");
    node.classList.remove("carrot-to-finish-instant");
    node.classList.remove("node-shortest-path");
  });
  var timerCounter = 0;
  for (let i = 0; i < visitedNodesInOrder.startToCarrot.length; i++) {
    timerCounter++;
    setTimeout(() => {
      const node = document.getElementById(
        `${visitedNodesInOrder.startToCarrot[i].row}-${visitedNodesInOrder.startToCarrot[i].col}`
      );
      node.classList.add("start-to-carrot");
    }, timerCounter * animationSpeed);
  }
  for (let i = 0; i < visitedNodesInOrder.carrotToFinish.length; i++) {
    timerCounter++;
    setTimeout(() => {
      const node = document.getElementById(
        `${visitedNodesInOrder.carrotToFinish[i].row}-${visitedNodesInOrder.carrotToFinish[i].col}`
      );
      node.classList.remove("start-to-carrot");

      node.classList.add("carrot-to-finish");
    }, animationSpeed * timerCounter);
  }
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    timerCounter++;
    setTimeout(() => {
      const node = document.getElementById(
        `${nodesInShortestPathOrder[i].row}-${nodesInShortestPathOrder[i].col}`
      );
      node.classList.remove("start-to-carrot");
      node.classList.remove("carrot-to-finish");

      node.classList.add("node-shortest-path");
    }, animationSpeed * timerCounter);
  }
  setTimeout(() => {
    store.dispatch(setIsAnimating(false));
  }, animationSpeed * timerCounter);
}
export function instantAnimateAlgorithm() {
  var { nodesInShortestPathOrder, visitedNodesInOrder } =
    store.getState().board.pathfindingResults;
  document.querySelectorAll(".node").forEach((node) => {
    node.classList.remove("carrot-to-finish");
    node.classList.remove("start-to-carrot");
    node.classList.remove("start-to-carrot-instant");
    node.classList.remove("carrot-to-finish-instant");

    node.classList.remove("node-shortest-path");
  });
  for (let i = 0; i < visitedNodesInOrder.startToCarrot.length; i++) {
    const node = document.getElementById(
      `${visitedNodesInOrder.startToCarrot[i].row}-${visitedNodesInOrder.startToCarrot[i].col}`
    );
    node.classList.add("start-to-carrot-instant");
  }
  for (let i = 0; i < visitedNodesInOrder.carrotToFinish.length; i++) {
    const node = document.getElementById(
      `${visitedNodesInOrder.carrotToFinish[i].row}-${visitedNodesInOrder.carrotToFinish[i].col}`
    );
    node.classList.remove("start-to-carrot-instant");

    node.classList.add("carrot-to-finish-instant");
  }
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = document.getElementById(
      `${nodesInShortestPathOrder[i].row}-${nodesInShortestPathOrder[i].col}`
    );
    node.classList.remove("start-to-carrot-instant");
    node.classList.remove("carrot-to-finish-instant");
    node.classList.add("node-shortest-path");
  }
}
