import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import {
  selectCurrentDropdown,
  selectMazeAlgorithms,
  selectMobileMenuOpen,
  selectObstacle,
  selectPathfindingAlgorithms,
  selectSpeed,
  toggleMobileMenuOpen,
  updateCurrentDropdown,
} from "../slices/headerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
export default function Header() {
  const dispatch = useDispatch();
  const currentDropdown = useSelector(selectCurrentDropdown);
  const mobileMenuOpen = useSelector(selectMobileMenuOpen);
  const pathfindingAlgorithms = useSelector(selectPathfindingAlgorithms);
  const mazeAlgorithms = useSelector(selectMazeAlgorithms);
  const obstacles = useSelector(selectObstacle);
  const speeds = useSelector(selectSpeed);
  const handleClick = (e) => {
    e.target.innerHTML === currentDropdown
      ? dispatch(updateCurrentDropdown("none"))
      : dispatch(updateCurrentDropdown(e.target.innerHTML));
  };
  const toggleMenuOpen = () => {
    dispatch(toggleMobileMenuOpen());
  };
  return (
    <header
      className="max-w-full bg-[#7A003C]"
      onClick={(e) => {
        handleClick(e);
      }}
    >
      <div className="flex justify-between px-4 py-3 relative">
        <h1 className="text-3xl">Pathfinding Visualizer</h1>
        <button
          onClick={() => {
            toggleMenuOpen();
          }}
        >
          {mobileMenuOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
        <ul
          className={`${
            mobileMenuOpen ? "absolute" : "hidden"
          } top-[100%] bg-[#7A003C] left-0 right-0`}
        >
          <li className="header-item ">
            <h1 className="header-item-name">Algorithms</h1>
            <HeaderDropdown
              dropdownItems={pathfindingAlgorithms}
              dropdownName={"Algorithms"}
            />
          </li>
          <li>
            <h1 className="header-item-name">Mazes</h1>
            <HeaderDropdown
              dropdownItems={mazeAlgorithms}
              dropdownName={"Mazes"}
            />
          </li>
          <li>
            <h1 className="header-item-name">Add Carrot</h1>
          </li>
          <li>
            <h1 className="header-item-name">Obstacle</h1>
            <HeaderDropdown
              dropdownItems={obstacles}
              dropdownName={"Obstacle"}
            />
          </li>
          <li>
            <h1 className="header-item-name">Speed</h1>
            <HeaderDropdown dropdownItems={speeds} dropdownName={"Speed"} />
          </li>
          <li>
            <h1 className="header-item-name">Reset</h1>
          </li>
          <li>
            <h1 className="header-item-name">Visualize</h1>
          </li>
        </ul>
      </div>
    </header>
  );
}
