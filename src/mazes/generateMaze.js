//entry point for maze generation
import { clearBoard, resetBoard } from "../slices/boardSlice";
import { setHasAnimated } from "../slices/animationSlice";
import { store } from "../store";
import { randomMaze } from "./randomMaze";
import { recursiveDivision } from "./recursiveDivision";
import { stairMaze } from "./stairMaze";
import { generatePathfindingResults } from "../pathfindingAlgorithms/generatePathfindingResults";
export function generateMaze(mazeId) {
  store.dispatch(resetBoard());
  store.dispatch(setHasAnimated(false));
  if (mazeId === "recursive division") {
    recursiveDivision();
  } else if (mazeId === "recursive division horizontal skew") {
    recursiveDivision("horizontal");
  } else if (mazeId === "recursive division vertical skew") {
    recursiveDivision("vertical");
  } else if (mazeId === "random maze") {
    randomMaze();
  } else if (mazeId === "stair maze") {
    stairMaze();
  }
}
