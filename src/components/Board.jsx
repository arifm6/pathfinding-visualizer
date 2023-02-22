import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { instantAnimateAlgorithm } from "../algorithms/animateAlgorithm";
import { findShortestDistance } from "../algorithms/findShortestDistance";
import {
  selectBoardArray,
  toggleCarrot,
  toggleFinish,
  toggleObstacle,
  toggleStart,
} from "../slices/boardSlice";
import {
  selectCurrentObstacle,
  selectHasAnimated,
  selectIsAnimating,
} from "../slices/headerSlice";
import {
  selectIsPressed,
  selectWhatIsPressed,
  setMouseIsLifted,
  setMouseIsPressed,
  setWhatIsPressed,
} from "../slices/mouseSlice";
import Node from "./Node";
export default function Board() {
  const boardArray = useSelector(selectBoardArray);
  const mouseIsPressed = useSelector(selectIsPressed);
  const whatIsPressed = useSelector(selectWhatIsPressed);
  const currentObstacle = useSelector(selectCurrentObstacle);
  const animationInProgress = useSelector(selectIsAnimating);
  const hasAnimated = useSelector(selectHasAnimated);
  const dispatch = useDispatch();
  useEffect(() => {
    if (animationInProgress) {
      return;
    }
    findShortestDistance();

    if (!hasAnimated) {
      return;
    }
    instantAnimateAlgorithm();
  }, [boardArray]);
  //only used for handling obstacle
  const handleMouseDown = (node) => {
    dispatch(setMouseIsPressed());
    if (node.isFinish) {
      dispatch(setWhatIsPressed("finish"));
    } else if (node.isStart) {
      dispatch(setWhatIsPressed("start"));
    } else if (node.isCarrot) {
      dispatch(setWhatIsPressed("carrot"));
    } else {
      dispatch(setWhatIsPressed("obstacle"));
      dispatch(toggleObstacle({ node, obstacle: currentObstacle }));
    }
  };
  const handleMouseEnter = (node) => {
    if (!mouseIsPressed) return;
    if (whatIsPressed === "finish") {
      dispatch(toggleFinish(node));
    } else if (whatIsPressed === "start") {
      dispatch(toggleStart(node));
    } else if (whatIsPressed === "carrot") {
      dispatch(toggleCarrot(node));
    } else {
      dispatch(toggleObstacle({ node, obstacle: currentObstacle }));
    }
  };
  const handleMouseExit = (node) => {
    if (!mouseIsPressed) return;
    if (whatIsPressed === "finish") {
      //remove previous finish
      dispatch(toggleFinish(node));
    } else if (whatIsPressed === "start") {
      dispatch(toggleStart(node));
    } else if (whatIsPressed === "carrot") {
      dispatch(toggleCarrot(node));
    }
  };
  const handleMouseUp = (node) => {
    dispatch(setWhatIsPressed(""));
    dispatch(setMouseIsLifted());
  };
  return (
    <div
      className={` ${
        animationInProgress && "pointer-events-none"
      } overflow-x-hidden mt-12`}
    >
      <table className="mx-auto">
        <tbody>
          {boardArray.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => {
                  return (
                    //remember col = node and are interchangeable here
                    <td key={colIndex}>
                      <Node
                        node={col}
                        handleMouseDown={() => handleMouseDown(col)}
                        handleMouseEnter={() => handleMouseEnter(col)}
                        handleMouseExit={() => handleMouseExit(col)}
                        handleMouseUp={() => handleMouseUp(col)}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
