import cancelBtn from "../../assets/icon/ic_delete.svg";
import visibleOn from "../../assets/btn_visibility_on_24px.svg";
import visibleOff from "../../assets/btn_visibility_on_24px-1.svg";
import { useState, useEffect, useRef } from "react";
import "./globalModal.css";

function UpdateConfirmModal({ isOpen, onUpdateConfirm, onCancel }) {
  // 상태 변수: 비밀번호와 비밀번호 가시성 토글
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dialogRef = useRef(null);

  // 컴포넌트가 처음 렌더링될 때 모달을 자동으로 열기 위한 useEffect
  useEffect(() => {
    const dialog = dialogRef.current;

    isOpen ? dialog.showModal() : dialog.close();
    // 컴포넌트가 언마운트될 때 모달을 닫아줍니다.
    return () => {
      if (dialog) {
        dialog.close(); // 모달 닫기
        setPassword("");
        setIsPasswordVisible(false);
      }
    };
  }, [isOpen]);

  // 비밀번호 가시성 토글 함수
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  // "다음" 버튼 클릭 시 실행되는 함수
  const handleNextClick = () => {
    onUpdateConfirm({ password }); // 비밀번호 전달
  };

  // 모달 닫기 버튼 클릭 시 실행되는 함수
  const handleCancelClick = () => {
    if (dialogRef.current) {
      dialogRef.current.close(); // 모달 닫기
    }
    onCancel(); // 취소 콜백 호출
  };

  return (
    <dialog ref={dialogRef} className="UpdateConfirmModal">
      <div className="UpdateConfirmModal-container">
        <div className="UpdateConfirmModal-head">
          <h3>수정 권한 인증</h3>
          <img
            className="cancel-button"
            src={cancelBtn}
            alt="cancel button"
            onClick={handleCancelClick}
          />
        </div>
        <div className="UpdateConfirmModal-body">
          <label>비밀번호</label>
          <div className="input-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="패스워드를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <img
              className="password-visibility"
              src={isPasswordVisible ? visibleOff : visibleOn}
              alt="toggle visibility"
              onClick={togglePasswordVisibility}
            />
          </div>

          <button className="next-btn" onClick={handleNextClick}>
            다음
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default UpdateConfirmModal;
