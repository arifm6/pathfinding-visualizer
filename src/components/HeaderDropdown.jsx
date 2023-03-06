import React from "react";
import { useSelector } from "react-redux";
import { selectIsAnimating } from "../slices/animationSlice";
import { selectCurrentDropdown } from "../slices/headerSlice";
export default function HeaderDropdown({
  dropdownItems,
  dropdownName,
  animationInProgress,
}) {
  const allowClickStyle = animationInProgress
    ? "hover:bg-red-600 hover:text-black"
    : "hover:bg-[#FDBF57] hover:text-[#7A003C]";
  const currentDropdown = useSelector(selectCurrentDropdown);
  return (
    <ul
      className={`${
        currentDropdown === dropdownName && "block"
      } header-item-dropdown cursor-pointer `}
    >
      {dropdownItems.map((dropdownItem, i) => {
        return (
          <li
            key={i}
            className={`px-4 py-6 ${allowClickStyle} transition-colors duration-300 text-[#EFEFEF] `}
            onClick={() => {
              dropdownItem.handleClick &&
                !animationInProgress &&
                dropdownItem.handleClick();
            }}
          >
            {dropdownItem.name}
          </li>
        );
      })}
    </ul>
  );
}
