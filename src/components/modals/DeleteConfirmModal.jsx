import { useState, useEffect, useRef } from "react";
import cancelBtn from "../../assets/icon/ic_delete.svg";
import visibleOn from "../../assets/btn_visibility_on_24px.svg";
import visibleOff from "../../assets/btn_visibility_on_24px-1.svg";
import "./globalModal.css";

function DeleteConfirmModal({ isOpen, onDeleteConfirm, onCancel }) {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dialogRef = useRef(null);

  // 모달 열기/닫기 로직을 관리하는 useEffect
  useEffect(() => {
    const dialog = dialogRef.current;
    isOpen ? dialog.showModal() : dialog.close();
    return () => {
      if (dialog) {
        dialog.close(); // 컴포넌트가 언마운트될 때 모달 닫기
        setPassword("");
        setIsPasswordVisible(false);
      }
    };
  }, [isOpen]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleDeleteClick = () => {
    onDeleteConfirm(password); // 비밀번호 전달하여 삭제 확인
  };

  const handleCancelClick = () => {
    if (dialogRef.current) {
      dialogRef.current.close(); // 모달 닫기
    }
    onCancel(); // 취소 콜백 호출
  };

  return (
    <dialog ref={dialogRef} className="DeleteConfirmModal">
      <div className="deleteModal-container">
        <div className="deleteModal-head">
          <h3 className="">삭제 권한 인증</h3>
          <img className="cancel-button" src={cancelBtn} alt="cancel button" onClick={handleCancelClick} />
        </div>
        <div className="deleteModal-body">
          <label>비밀번호</label>
          <div className="input-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="패스워드를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              className="password-visibility"
              src={isPasswordVisible ? visibleOff : visibleOn}
              alt="toggle visibility"
              onClick={togglePasswordVisibility}
            />
          </div>
          <button className="delete-btn" onClick={handleDeleteClick}>
            삭제하기
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DeleteConfirmModal;
