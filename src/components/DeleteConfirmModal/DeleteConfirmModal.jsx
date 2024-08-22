import { useState } from "react";
import deleteBtn from "../../assets/icon/ic_delete.svg";
import visibleOn from "../../assets/btn_visibility_on_24px.svg";
import visibleOff from "../../assets/btn_visibility_on_24px-1.svg";
import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ onDeleteConfirm, onCancel }) {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleDeleteClick = () => {
    onDeleteConfirm(password);
  };

  return (
    <div className="DeleteConfirmModal">
      <div className="deleteModal-container">
        <div className="deleteModel-head">
          <h3>삭제 권한 인증</h3>
          <img src={deleteBtn} alt="delete button" onClick={onCancel} />
        </div>
        <div className="deleteModel-body">
          <label>비밀번호</label>
          <div className="input-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="패스워드를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
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
    </div>
  );
}
export default DeleteConfirmModal;
