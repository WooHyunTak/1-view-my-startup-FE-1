import { useState, useRef, useEffect } from "react";
import { optionsByType } from "../../utils/buttonOptions";
import dropDownIcon from "../../assets/icon/ic_toggle.svg";
import "./DropDown.css";

//필요한 props: orderBy, setOrderby, buttonType
export default function DropDown({ orderBy, setOrderBy, buttonType }) {
  // 드롭다운의 상태(열림 or 닫힘)를 저장, 초기값 = false
  const [isOpen, setIsOpen] = useState(false);

  // 드롭다운 메뉴 외부 클릭을 감지하기 위한 참조값
  // 드롭다운 버튼에 참조 부여
  const dropDownRef = useRef(0);

  //css를 위한 버튼 사이즈 옵셥: small or large
  const typeSize = optionsByType[buttonType].size;

  //buttonOption.js에 정의 해둔 드롭다운 타입별 옵션 가져오기
  const options = optionsByType[buttonType].options;

  // 현재 정렬 상태를 번트에 표시하기 위한 함수
  // `orderBy`와 일치하는 옵션을 찾아서 해당 옵션의 라벨을 반환
  // 일치하는 하는 옵션이 없으면 기본 정렬 상태를 표시
  const displayCurrentOrder = (order) => {
    const selectedOption = options.find((option) => option.value === order);
    return selectedOption
      ? selectedOption.label
      : optionsByType[buttonType].defaultSort;
  };

  // 드롭다운 메뉴의 열림/닫힘 상태를 토글하는 함수
  const toggleDropDown = () => {
    setIsOpen(!isOpen); // 현재 상태의 반대로 설정
  };

  // 사용자가 드롭다운 메뉴를 클릭했을 때 호출되는 함수
  // 선택한 정렬 기준을 `setOrderBy`를 통해 업데이트하고, 드롭다운을 닫음
  const handleSorting = (option) => {
    setOrderBy("orderBy", option);
    setIsOpen(false);
  };

  // 드롭다운 메뉴 외부를 클랙했을 때, 메뉴를 닫기 위한 함수
  // 이벡트 객체를 받아서, 드롭다운 영역 외부를 클릭한 경우 드롭다운을 닫음
  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // 컴포넌트가 마운트(virtual DOM에 추가 -> DOM에 추가)될 때, document에 클릭 이벤트 리스너 추가
  // 언마운트(virtual DOM에서 삭제 -> DOM에서 삭제)될 때 리스너 제거
  // useRef는 상태를 관리하지만, 그 상태가 변경되더라도 컴포넌트를 다시 렌더링하지 않으므로
  // 의존성 배열에 추가할 필요 없음
  useEffect(() => {
    document.addEventListener("click", handleClickOutside); // 외부 클릭 감지
    return () => {
      document.removeEventListener("click", handleClickOutside); // 클린업 함수
    };
  }, []);

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
