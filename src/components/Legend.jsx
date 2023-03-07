import React from "react";

export default function Legend() {
  const legend = [
    { name: "Start Node", className: "start-node" },
    { name: "Finish Node", className: "finish-node" },
    {
      name: "Unvisited Node",
      className: "border border-[#5E6A71]",
      alt: "finish-icon",
    },

    { name: "Carrot Node", className: "carrot-node" },
    { name: "Wall Node", className: "wall-node" },

    { name: "Weight Node", className: "weight-node" },
    { name: "Visited Node 1", className: "carrot-to-finish" },
    { name: "Visited Node 2", className: "start-to-carrot" },
    { name: "Shortest Path Node", className: "node-shortest-path" },
  ];
  return (
    <ul className="mt-4 max-w-full flex flex-wrap p-2 space-x-8 items-center justify-center space-y-2">
      {legend.map((legendItem, i) => {
        return (
          <li className="legend-item" key={i}>
            <div className={`w-8 h-8 animate-none ${legendItem.className}`} />
            <h3>{legendItem.name}</h3>
          </li>
        );
      })}
    </ul>
  );
}
