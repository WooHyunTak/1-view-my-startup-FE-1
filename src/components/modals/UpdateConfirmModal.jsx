import "./UpdateConfirmModal.css";
import cancelBtn from "../../assets/icon/ic_delete.svg";
import visibleOn from "../../assets/btn_visibility_on_24px.svg";
import visibleOff from "../../assets/btn_visibility_on_24px-1.svg";
import { useState } from "react";

function UpdateConfirmModal({ onUpdateConfirm, onCancel }) {
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleNextClick = () => {
    onUpdateConfirm({ password });
  };

  return (
    <div className="UpdateConfirmModal">
      <div className="UpdateConfirmModal-container">
        <div className="UpdateConfirmModal-head">
          <h3>수정 권한 인증</h3>
          <img
            className="cancel-button"
            src={cancelBtn}
            alt="cancel button"
            onClick={onCancel}
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
    </div>
  );
}

export default UpdateConfirmModal;
