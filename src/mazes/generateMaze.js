//entry point for maze generation
import { clearBoard } from "../slices/boardSlice";
import { setHasAnimated } from "../slices/headerSlice";
import { store } from "../store";
import { randomMaze } from "./randomMaze";
import { recursiveDivision } from "./recursiveDivision";
import { stairMaze } from "./stairMaze";
export function generateMaze(mazeId) {
  store.dispatch(clearBoard());
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
    console.log("stair");
    stairMaze();
  }
}
