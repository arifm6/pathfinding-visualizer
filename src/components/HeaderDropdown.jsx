import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentDropdown } from "../slices/headerSlice";
export default function HeaderDropdown({ dropdownItems, dropdownName }) {
  const currentDropdown = useSelector(selectCurrentDropdown);
  return (
    <ul
      className={`${
        currentDropdown === dropdownName && "block"
      } header-item-dropdown `}
    >
      {dropdownItems.map((dropdownItem, i) => {
        return (
          <li
            key={i}
            className="px-4 py-6 hover:bg-[#FDBF57] hover:text-[#7A003C] transition-colors duration-300 "
            onClick={() => {
              dropdownItem.handleClick && dropdownItem.handleClick();
            }}
          >
            {dropdownItem.name}
          </li>
        );
      })}
    </ul>
  );
}
