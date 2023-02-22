import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import {
  selectCurrentAnimationSpeed,
  selectCurrentObstacle,
  selectCurrentPathfindingAlgorithm,
  selectMobileMenuOpen,
  setAnimationSpeed,
  setHasAnimated,
  setPathfindingAlgorithm,
  setWall,
  setWeight,
  toggleMobileMenuOpen,
} from "../slices/headerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  addCarrot,
  removeCarrot,
  resetBoard,
  selectCarrotLocation,
} from "../slices/boardSlice";
import { recursiveDivision } from "../mazes/recursiveDivision";
import { randomMaze } from "../mazes/randomMaze";
import { stairMaze } from "../mazes/stairMaze";
import { findShortestDistance } from "../algorithms/findShortestDistance";
import { animateAlgorithm } from "../algorithms/animateAlgorithm";
export default function Header() {
  const dispatch = useDispatch(resetBoard());
  const currentPathfindingAlgorithm = useSelector(
    selectCurrentPathfindingAlgorithm
  );
  const boardHasCarrot = useSelector(selectCarrotLocation).row !== -1;
  const currentObstacle = useSelector(selectCurrentObstacle);
  const currentAnimationSpeed = useSelector(selectCurrentAnimationSpeed);
  function pathfindingAlgorithmName(pathfindingAlgorithm) {
    if (pathfindingAlgorithm === "dijkstra") {
      return "Dijkstra's";
    }
    return "";
  }

  const algorithms = {
    name: "Algorithms",
    dropdownItems: [
      {
        name: "Dijkstra's",
        id: "dijkstra",
        handleClick: function () {
          dispatch(setPathfindingAlgorithm(this.id));
          findShortestDistance();
        },
      },
      {
        name: "A*",
        id: "aStar",
      },
    ],
  };
  const mazes = {
    name: "Mazes",
    dropdownItems: [
      {
        name: "Recursive Division",
        id: "recursive division",
        handleClick: function () {
          dispatch(setHasAnimated(false));
          recursiveDivision();
        },
      },
      {
        name: "Recursive Division Horizontal Skew",
        id: "recursive division horizontal skew",
        handleClick: function () {
          dispatch(setHasAnimated(false));

          recursiveDivision("horizontal");
        },
      },

      {
        name: "Recursive Division Vertical Skew",
        id: "recursive division vertical skew",
        handleClick: function () {
          dispatch(setHasAnimated(false));

          recursiveDivision("vertical");
        },
      },
      {
        name: "Random Maze",
        id: "random maze",
        handleClick: function () {
          dispatch(setHasAnimated(false));

          randomMaze();
        },
      },
      {
        name: "Stair",
        id: "stair",
        handleClick: function () {
          dispatch(setHasAnimated(false));

          stairMaze();
        },
      },
    ],
  };
  const carrot = {
    name: `${!boardHasCarrot ? "Add Carrot" : "Remove Carrot"}`,
    handleClick: function () {
      if (boardHasCarrot) {
        dispatch(removeCarrot());
      } else {
        dispatch(addCarrot());
      }
    },
  };
  const obstacles = {
    name: `Obstacle: ${
      currentObstacle.charAt(0).toUpperCase() + currentObstacle.slice(1)
    }`,

    dropdownItems: [
      {
        name: "Wall",
        id: "wall",
        handleClick: function () {
          dispatch(setWall());
        },
      },
      {
        name: "Weight",
        id: "weight",
        handleClick: function () {
          dispatch(setWeight());
        },
      },
    ],
  };

  const speed = {
    name: `Speed: ${
      currentAnimationSpeed === 25
        ? "Fast"
        : currentAnimationSpeed === 50
        ? "Medium"
        : "Slow"
    }`,
    dropdownItems: [
      {
        name: "Fast",
        value: 25,
        handleClick: function () {
          dispatch(setAnimationSpeed(this.value));
        },
      },
      {
        name: "Medium",
        value: 50,
        handleClick: function () {
          dispatch(setAnimationSpeed(this.value));
        },
      },
      {
        name: "Slow",
        value: 100,
        handleClick: function () {
          dispatch(setAnimationSpeed(this.value));
        },
      },
    ],
  };
  const reset = {
    name: "Reset",
    handleClick: function () {
      dispatch(resetBoard());
      dispatch(setHasAnimated(false));
      dispatch(setPathfindingAlgorithm(""));
    },
  };
  const visualize = {
    name: `${
      currentPathfindingAlgorithm
        ? `Visualize ${pathfindingAlgorithmName(currentPathfindingAlgorithm)}`
        : "Pick An Algorithm"
    }`,
    handleClick: function () {
      currentPathfindingAlgorithm && animateAlgorithm();
      dispatch(setHasAnimated(true));
    },
  };
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
          <li className="header-item ">
            <h1 className="header-item-name" data-name={algorithms.name}>
              {algorithms.name}{" "}
              <span className="text-sm" data-name={algorithms.name}>
                &#9660;
              </span>
            </h1>
            <HeaderDropdown
              dropdownName={algorithms.name}
              dropdownItems={algorithms.dropdownItems}
            />
          </li>
          <li className="header-item">
            <h1 className="header-item-name" data-name={mazes.name}>
              {mazes.name}{" "}
              <span className="text-sm" data-name={mazes.name}>
                &#9660;
              </span>
            </h1>
            <HeaderDropdown
              dropdownName={mazes.name}
              dropdownItems={mazes.dropdownItems}
            />
          </li>
          <li className="header-item" onClick={() => carrot.handleClick()}>
            <h1 className="header-item-name">{carrot.name}</h1>
          </li>
          <li className="header-item">
            <h1 className="header-item-name " data-name={obstacles.name}>
              {obstacles.name}{" "}
              <span className="text-sm" data-name={obstacles.name}>
                &#9660;
              </span>
            </h1>
            <HeaderDropdown
              dropdownName={obstacles.name}
              dropdownItems={obstacles.dropdownItems}
            />
          </li>
          <li className="header-item" onClick={() => reset.handleClick()}>
            <h1 className="header-item-name">{reset.name}</h1>
          </li>

          <li className="header-item">
            <h1 className="header-item-name" data-name={speed.name}>
              {speed.name}{" "}
              <span className="text-sm" data-name={speed.name}>
                &#9660;
              </span>
            </h1>
            <HeaderDropdown
              dropdownName={speed.name}
              dropdownItems={speed.dropdownItems}
            />
          </li>
          <li className="header-item" onClick={() => visualize.handleClick()}>
            <h1 className="header-item-name">{visualize.name}</h1>
          </li>
        </ul>
      </div>
    </header>
  );
}
