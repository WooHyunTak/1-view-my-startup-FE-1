import { useEffect, useRef, useState } from "react";
import editBtnImg from "../../assets/ic_kebab.svg";

function DetailPageDropdown() {
  const [visible, setVisible] = useState(false);
  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  // 메뉴 외부 클릭 감지 함수
  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    // 외부 클릭 감시 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="DetailPageDropdown">
      <button onClick={toggleDropdown} ref={dropDownRef} className="edit-btn">
        <img src={editBtnImg} alt="Edit button" />
      </button>
      {visible && (
        <div className="dropdown-menu">
          <button>수정하기</button>
          <button>삭제하기</button>
        </div>
      )}
    </div>
  );
}

export default DetailPageDropdown;
