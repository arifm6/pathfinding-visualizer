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
  return (
    <div
      onMouseDown={() => handleMouseDown()}
      onMouseEnter={() => handleMouseEnter()}
      onMouseLeave={() => handleMouseExit()}
      onMouseUp={() => handleMouseUp()}
      className="node-container"
    >
      <div className={`node ${typeOfNode}`}></div>
    </div>
  );
}
