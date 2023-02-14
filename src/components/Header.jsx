import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import {
  selectMazeAlgorithms,
  selectMobileMenuOpen,
  selectObstacle,
  selectPathfindingAlgorithms,
  selectSpeed,
  toggleMobileMenuOpen,
} from "../slices/headerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
export default function Header() {
  const dispatch = useDispatch();
  const mobileMenuOpen = useSelector(selectMobileMenuOpen);
  const pathfindingAlgorithms = useSelector(selectPathfindingAlgorithms);
  const mazeAlgorithms = useSelector(selectMazeAlgorithms);
  const obstacles = useSelector(selectObstacle);
  const speeds = useSelector(selectSpeed);
  const handleMobileMenuClick = () => {
    dispatch(toggleMobileMenuOpen());
  };
  return (
    <header className="max-w-full bg-[#7A003C]">
      <div className="flex justify-between px-4 relative items-center">
        <h1 className="text-3xl text-[#EFEFEF] py-3">Pathfinding Visualizer</h1>
        <button className="lg:hidden" onClick={() => handleMobileMenuClick()}>
          {mobileMenuOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
        <ul
          className={`${
            mobileMenuOpen ? "absolute" : "hidden"
          } top-[100%] bg-[#7A003C] left-0 right-0 lg:static lg:flex grow items-center cursor-pointer`}
        >
          <li className="header-item ">
            <h1 className="header-item-name">Algorithms</h1>
            <HeaderDropdown
              dropdownItems={pathfindingAlgorithms}
              dropdownName={"Algorithms"}
            />
          </li>
          <li className="header-item  ">
            <h1 className="header-item-name">Mazes</h1>
            <HeaderDropdown
              dropdownItems={mazeAlgorithms}
              dropdownName={"Mazes"}
            />
          </li>
          <li className="header-item  ">
            <h1 className="header-item-name">Add Carrot</h1>
          </li>
          <li className="header-item  ">
            <h1 className="header-item-name">Obstacle</h1>
            <HeaderDropdown
              dropdownItems={obstacles}
              dropdownName={"Obstacle"}
            />
          </li>
          <li className="header-item  ">
            <h1 className="header-item-name">Speed</h1>
            <HeaderDropdown dropdownItems={speeds} dropdownName={"Speed"} />
          </li>
          <li className="header-item  ">
            <h1 className="header-item-name">Reset</h1>
          </li>
          <li className="header-item  ">
            <h1 className="header-item-name">Visualize</h1>
          </li>
        </ul>
      </div>
    </header>
  );
}
