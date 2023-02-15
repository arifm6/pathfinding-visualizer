import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import headerData from "../header.json";
import {
  selectMobileMenuOpen,
  toggleMobileMenuOpen,
} from "../slices/headerSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
export default function Header() {
  const dispatch = useDispatch();

  const mobileMenuOpen = useSelector(selectMobileMenuOpen);
  const handleMobileMenuClick = () => {
    dispatch(toggleMobileMenuOpen());
  };
  return (
    <header className="max-w-full bg-[#7A003C]">
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
          } top-[100%] bg-[#7A003C] left-0 right-0 lg:static lg:flex grow items-center cursor-pointer`}
        >
          {headerData.map((headerDataItem, i) => {
            return (
              <li className="header-item" key={i}>
                <h1 className="header-item-name">{headerDataItem.name}</h1>
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
