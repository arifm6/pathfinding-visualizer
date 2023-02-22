import React from "react";

export default function Node({
  node,
  handleMouseDown,
  handleMouseEnter,
  handleMouseExit,
  handleMouseUp,
}) {
  const typeOfNode = node.isFinish
    ? "finish-node"
    : node.isStart
    ? "start-node"
    : node.isCarrot
    ? "carrot-node"
    : node.obstacle === "wall"
    ? "wall-node"
    : node.obstacle === "weight"
    ? "weight-node"
    : "";
  //e for mouse down is used to prevent default which is dragging cell
  return (
    <div
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseExit()}
      onMouseUp={() => handleMouseUp()}
      className="node-container"
    >
      <div
        id={`${node.row}-${node.col}`}
        className={`node ${typeOfNode}`}
      ></div>
    </div>
  );
}
