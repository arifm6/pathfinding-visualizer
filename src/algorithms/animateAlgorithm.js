import { setIsAnimating } from "../slices/headerSlice";
import { store } from "../store";

var animationSpeed = store.getState().header.currentAnimationSpeed;
export function animateAlgorithm({
  visitedNodesInOrder,
  nodesInShortestPathOrder,
}) {
  store.dispatch(setIsAnimating(true));
  animationSpeed = store.getState().header.currentAnimationSpeed;
  document.querySelectorAll(".node").forEach((node) => {
    node.classList.remove("carrot-to-finish");
    node.classList.remove("start-to-carrot");
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
