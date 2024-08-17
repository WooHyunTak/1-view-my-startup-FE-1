import { useState, useRef, useEffect } from "react";
import dropDownIcon from "../../assets/icon/ic_toggle.svg";

import "./DropDown.css";

export function DropDown({ orderBy, setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(0);

  const options = [
    { value: "highestInvestment", label: "누적 투자금액 높은순" },
    { value: "lowestInvestment", label: "누적 투자금액 낮은순" },
    { value: "highestRevenue", label: "매출액 높은순" },
    { value: "lowestRevenue", label: "매출액 낮은순" },
    { value: "highestEmployees", label: "고용 인원 많은순" },
    { value: "lowestEmployees", label: "고용 인원 적은순" },
  ];

  const displayCurrentOrder = (order) => {
    const selectedOption = options.find((option) => option.value === order);
    return selectedOption ? selectedOption.label : "매출액 높은순";
  };

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSorting = (option) => {
    setOrderBy(option);
    setIsOpen(false);
  };

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
    <div className="DropDown">
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
