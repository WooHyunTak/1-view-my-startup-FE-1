import { useState, useRef, useEffect } from "react";
import dropDownIcon from "../../assets/icon/ic_toggle.svg";
import { optionsByType } from "../../utils/buttonOptions";
import "./DropDown.css";

//필요한 props: orderBy, setOrderby, buttonType
export function DropDown({ orderBy, setOrderBy, buttonType }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(0);

  //css를 위한 버튼 사이즈 옵셥: small or large
  const typeSize = optionsByType[buttonType].size;

  //buttonOption.js에 정의 해둔 드롭다운 타입별 옵션 가져오기
  const options = optionsByType[buttonType].options;

  //현재 정렬상태 버튼 이름으로 display
  const displayCurrentOrder = (order) => {
    const selectedOption = options.find((option) => option.value === order);
    return selectedOption
      ? selectedOption.label
      : optionsByType[buttonType].defaultSort;
  };

  //드롭다운 메뉴 리스트 토글.
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  //정렬버튼 누르면 orderBy 상태 업데이트 및 드롭다운 리스트 닫힘
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
