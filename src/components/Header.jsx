import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import {
  selectCurrentAnimationSpeed,
  selectCurrentObstacle,
  selectCurrentPathfindingAlgorithm,
  selectMobileMenuOpen,
  setAnimationSpeed,
  setPathfindingAlgorithm,
  setWall,
  setWeight,
  toggleMobileMenuOpen,
} from "../slices/headerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { addCarrot, resetBoard } from "../slices/boardSlice";
import { recursiveDivision } from "../mazes/recursiveDivision";
import { randomMaze } from "../mazes/randomMaze";
import { stairMaze } from "../mazes/stairMaze";
import { findShortestDistance } from "../algorithms/findShortestDistance";
export default function Header() {
  const dispatch = useDispatch(resetBoard());
  const currentPathfindingAlgorithm = useSelector(
    selectCurrentPathfindingAlgorithm
  );
  const currentObstacle = useSelector(selectCurrentObstacle);
  const currentAnimationSpeed = useSelector(selectCurrentAnimationSpeed);
  const headerData = [
    {
      name: "Algorithms",
      dropdownItems: [
        {
          name: "Dijkstra's",
          handleClick: function () {
            dispatch(setPathfindingAlgorithm("dijkstra"));
            findShortestDistance();
          },
        },
        { name: "A*" },
        { name: "Swarm" },
        { name: "Breadth-First Search" },
        { name: "Depth-First Search" },
      ],
    },
    {
      name: "Mazes",
      dropdownItems: [
        {
          name: "Recursive Division",
          handleClick: function () {
            recursiveDivision();
          },
        },
        {
          name: "Recursive Division Horizontal Skew",
          handleClick: function () {
            recursiveDivision("horizontal");
          },
        },

        {
          name: "Recursive Division Vertical Skew",
          handleClick: function () {
            recursiveDivision("vertical");
          },
        },
        {
          name: "Random Maze",
          handleClick: function () {
            randomMaze();
          },
        },
        {
          name: "Stair",
          handleClick: function () {
            stairMaze();
          },
        },
      ],
    },
    {
      name: `Add Carrot`,
      dropdownItems: [],
      handleClick: function () {
        dispatch(addCarrot());
      },
    },
    {
      name: `Obstacle: ${
        //capitalize first char
        currentObstacle.charAt(0).toUpperCase() + currentObstacle.slice(1)
      }`,
      dropdownItems: [
        {
          name: "Wall",
          handleClick: function () {
            dispatch(setWall());
          },
        },
        {
          name: "Weight",
          handleClick: function () {
            dispatch(setWeight());
          },
        },
      ],
    },
    {
      name: `Speed: ${
        currentAnimationSpeed === 33
          ? "Fast"
          : currentAnimationSpeed === 66
          ? "Medium"
          : "Slow"
      }`,
      dropdownItems: [
        {
          name: "Fast",
          value: 33,
          handleClick: function () {
            dispatch(setAnimationSpeed(this.value));
          },
        },
        {
          name: "Medium",
          value: 66,
          handleClick: function () {
            dispatch(setAnimationSpeed(this.value));
          },
        },
        {
          name: "Slow",
          value: 99,
          handleClick: function () {
            dispatch(setAnimationSpeed(this.value));
          },
        },
      ],
    },

    {
      name: "Reset",
      dropdownItems: [],
      handleClick: function () {
        dispatch(resetBoard());
      },
    },
    { name: `Visualize ${currentPathfindingAlgorithm}`, dropdownItems: [] },
  ];
  const mobileMenuOpen = useSelector(selectMobileMenuOpen);
  const handleMobileMenuClick = () => {
    dispatch(toggleMobileMenuOpen());
  };
  return (
    <header className="w-screen max-w-[100vw] bg-[#7A003C]">
      <div className="flex justify-between px-4 relative items-center">
        <h1 className="text-3xl text-[#EFEFEF] py-3 hover:text-[#FDBF57] transition-colors duration-300 cursor-pointer">
          Pathfinding Visualizer
        </h1>
        <button className="lg:hidden" onClick={() => handleMobileMenuClick()}>
          {mobileMenuOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
        <ul
          className={`${
            mobileMenuOpen ? "absolute" : "hidden"
          } top-[100%] bg-[#7A003C] left-0 right-0 lg:static lg:flex grow items-center cursor-pointer z-30`}
        >
          {headerData.map((headerDataItem, i) => {
            return (
              <li className="header-item" key={i}>
                <h1
                  className="header-item-name"
                  onClick={() =>
                    headerDataItem.handleClick && headerDataItem.handleClick()
                  }
                >
                  {headerDataItem.name}
                </h1>
                <HeaderDropdown
                  dropdownItems={headerDataItem.dropdownItems}
                  dropdownName={headerDataItem.name}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
