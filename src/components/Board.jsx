import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBoardArray, toggleObstacle } from "../slices/boardSlice";
import { selectCurrentObstacle } from "../slices/headerSlice";
import { selectIsPressed, setMouseIsPressed } from "../slices/mouseSlice";
import Node from "./Node";
export default function Board() {
  const boardArray = useSelector(selectBoardArray);
  const mouseIsPressed = useSelector(selectIsPressed);
  const currentObstacle = useSelector(selectCurrentObstacle);
  const dispatch = useDispatch();
  //only used for handling obstacle
  const handleMouseDown = (node) => {
    dispatch(setMouseIsPressed());
    dispatch(toggleObstacle({ node, obstacle: currentObstacle }));
  };
  return (
    <div className="w-full  max-w-full mt-12">
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
