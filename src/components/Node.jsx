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
  //on drag start part is used to prevent default drag
  return (
    <div
      onDragStart={() => {
        return false;
      }}
      onMouseDown={() => handleMouseDown()}
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
