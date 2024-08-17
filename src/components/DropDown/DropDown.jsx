import { useState, useRef, useEffect } from "react";
import dropDownIcon from "../../assets/icon/ic_toggle.svg";

import { optionsByType } from "./buttonOptions";
import "./DropDown.css";

export function DropDown({ orderBy, setOrderBy, buttonType }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(0);

  const typeSize = optionsByType[buttonType].size;
  const options = optionsByType[buttonType].options;

  const displayCurrentOrder = (order) => {
    const selectedOption = options.find((option) => option.value === order);
    return selectedOption
      ? selectedOption.label
      : optionsByType[buttonType].defaultSort;
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSorting = (option) => {
    setOrderBy(option);
    setIsOpen(false);
  };

  //버튼 외 다른 공간 클릭하면 드롭다운 메뉴 닫힘.
  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropDownRef]);

  return (
    <div className={`DropDown ${typeSize}`}>
      <button onClick={toggleDropDown} ref={dropDownRef}>
        {displayCurrentOrder(orderBy)}
        <img src={dropDownIcon} alt="drop down icon" />
      </button>
      {isOpen && (
        <ul>
          {options.map((option) => {
            return (
              <li
                onClick={() => handleSorting(option.value)}
                key={option.value}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
