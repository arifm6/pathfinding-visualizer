import React, { useState } from "react";
import HeaderDropdown from "./HeaderDropdown";
import {
  selectBidirectional,
  selectCurrentObstacle,
  selectCurrentPathfindingAlgorithm,
  setPathfindingAlgorithm,
  setWall,
  setWeight,
  toggleBidirectional,
} from "../slices/headerSlice";
import {
  setAnimationSpeed,
  setHasAnimated,
  selectCurrentAnimationSpeed,
  selectIsAnimating,
} from "../slices/animationSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  addCarrot,
  clearBoard,
  removeCarrot,
  resetBoard,
  selectCarrotLocation,
} from "../slices/boardSlice";
import { generateMaze } from "../mazes/generateMaze";
import { generatePathfindingResults } from "../pathfindingAlgorithms/generatePathfindingResults";
import { animateAlgorithm } from "../pathfindingAlgorithms/animateAlgorithm";
export default function Header() {
  const dispatch = useDispatch(resetBoard());
  const currentPathfindingAlgorithm = useSelector(
    selectCurrentPathfindingAlgorithm
  );
  const boardHasCarrot = useSelector(selectCarrotLocation).row !== -1;
  const currentObstacle = useSelector(selectCurrentObstacle);
  const currentAnimationSpeed = useSelector(selectCurrentAnimationSpeed);
  const animationInProgress = useSelector(selectIsAnimating);

  function pathfindingAlgorithmName(pathfindingAlgorithm) {
    if (pathfindingAlgorithm === "dijkstra") {
      return "Dijkstra's";
    } else if (pathfindingAlgorithm === "aStar") {
      return "A*";
    } else if (pathfindingAlgorithm === "greedyBestFirst") {
      return "Greedy Best-First";
    } else if (pathfindingAlgorithm === "breadthFirstSearch") {
      return "Breadth First";
    }
    return "";
  }

  function updateAlgorithm(algorithm) {
    dispatch(clearBoard());
    dispatch(setHasAnimated(false));
    dispatch(setPathfindingAlgorithm(algorithm));
    generatePathfindingResults();
  }
  const algorithms = {
    name: "Algorithms",
    dropdownItems: [
      {
        name: "Dijkstra's",
        id: "dijkstra",
        handleClick: function () {
          updateAlgorithm(this.id);
        },
      },
      {
        name: "A*",
        id: "aStar",
        handleClick: function () {
          updateAlgorithm(this.id);
        },
      },
      {
        name: "Greedy Best-First",
        id: "greedyBestFirst",
        handleClick: function () {
          updateAlgorithm(this.id);
        },
      },
      {
        name: "Breadth First Search",
        id: "breadthFirstSearch",
        handleClick: function () {
          updateAlgorithm(this.id);
        },
      },
    ],
  };
  const mazes = {
    name: "Mazes",
    dropdownItems: [
      {
        name: "Recursive Division",
        id: "recursive division",
        handleClick() {
          generateMaze(this.id);
        },
      },
      {
        name: "Recursive Division Horizontal Skew",
        id: "recursive division horizontal skew",
        handleClick() {
          generateMaze(this.id);
        },
      },

      {
        name: "Recursive Division Vertical Skew",
        id: "recursive division vertical skew",
        handleClick() {
          generateMaze(this.id);
        },
      },
      {
        name: "Random Maze",
        id: "random maze",
        handleClick() {
          generateMaze(this.id);
        },
      },
      {
        name: "Stair",
        id: "stair maze",
        handleClick() {
          generateMaze(this.id);
        },
      },
    ],
  };
  const carrot = {
    name: `${!boardHasCarrot ? "Add Carrot" : "Remove Carrot"}`,
    handleClick: function () {
      dispatch(clearBoard());
      dispatch(setHasAnimated(false));

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
  const bidirectional = {
    name: `Bidirectional: ${
      useSelector(selectBidirectional) === true ? "Yes" : "No"
    }`,
    handleClick: function () {
      dispatch(toggleBidirectional());
    },
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
      if (!currentPathfindingAlgorithm) {
        return;
      }
      generatePathfindingResults();
      currentPathfindingAlgorithm && dispatch(setHasAnimated(true));

      animateAlgorithm();
    },
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMobileMenuClick = () => {
    setMobileMenuOpen((prevMobileMenuOpen) => !prevMobileMenuOpen);
  };
  const allowClickStyle = animationInProgress
    ? "hover:text-red-600"
    : "hover:text-[#FDBF57]";

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
          <li className="header-item " data-name={algorithms.name}>
            <h1 className="header-item-name" data-name={algorithms.name}>
              {algorithms.name}{" "}
              <span className="text-sm" data-name={algorithms.name}>
                &#9660;
              </span>
            </h1>
            <HeaderDropdown
              dropdownName={algorithms.name}
              dropdownItems={algorithms.dropdownItems}
              animationInProgress={animationInProgress}
            />
          </li>
          <li
            className="header-item"
            onClick={() => bidirectional.handleClick()}
          >
            <h1 className="header-item-name">{bidirectional.name} </h1>
          </li>

          <li className="header-item" data-name={mazes.name}>
            <h1 className="header-item-name" data-name={mazes.name}>
              {mazes.name}{" "}
              <span className="text-sm" data-name={mazes.name}>
                &#9660;
              </span>
            </h1>
            <HeaderDropdown
              dropdownName={mazes.name}
              dropdownItems={mazes.dropdownItems}
              animationInProgress={animationInProgress}
            />
          </li>
          <li
            className={`header-item ${allowClickStyle}`}
            onClick={() => !animationInProgress && carrot.handleClick()}
          >
            <h1 className={`header-item-name `}>{carrot.name}</h1>
          </li>
          <li className="header-item" data-name={obstacles.name}>
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
          <li className="header-item" data-name={speed.name}>
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

          <li
            className={`header-item ${allowClickStyle}`}
            onClick={() => !animationInProgress && reset.handleClick()}
          >
            <h1 className={`header-item-name `}>{reset.name}</h1>
          </li>

          <li
            className={`header-item  bg-[#FDBF57] py-1  rounded opacity-90 text-[#7A003C] hover:opacity-100 active:opacity-80 cursor-pointer ${
              animationInProgress
                ? "hover:text-red-600"
                : "hover:text-[#7A003C]"
            }`}
            onClick={() => !animationInProgress && visualize.handleClick()}
          >
            <h1 className={`header-item-name  `}>{visualize.name}</h1>
          </li>
        </ul>
      </div>
    </header>
  );
}
