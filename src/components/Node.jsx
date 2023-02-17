import React from "react";

export default function Node({ node, handleMouseDown }) {
  const typeOfObstacle =
    node.obstacle === "wall"
      ? "wall-node"
      : node.obstacle === "weight"
      ? "weight-node"
      : "";
  return (
    <div onMouseDown={() => handleMouseDown()} className="node-container">
      <div className={`node ${typeOfObstacle}`}></div>
    </div>
  );
}
