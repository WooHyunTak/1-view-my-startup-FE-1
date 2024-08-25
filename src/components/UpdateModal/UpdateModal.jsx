import "./UpdateModal.css";
import cancelBtn from "../../assets/icon/ic_delete.svg";

import visibleOn from "../../assets/btn_visibility_on_24px.svg";
import visibleOff from "../../assets/btn_visibility_on_24px-1.svg";

import { useState } from "react";

function UpdateModal({ onUpdateConfirm, onCancel }) {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleUpdateClick = () => {
    onUpdateConfirm({ amount, comment, password });
  };

  return (
    <div className="UpdateModal">
      <div className="updateModal-head">
        <div className="head-title">
          <h3>수정 권한 인증</h3>
          <img className="cancel-button" src={cancelBtn} alt="cancel button img" onClick={onCancel} />
        </div>
      </div>

      <div className="updateModal-body">
        <label>투자 금액</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="투자 금액을 입력해 주세요"
        />
        <label>투자 코멘트</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="투자에 대한 코멘트를 입력해 주세요"
        />
        <label>비밀 번호</label>
        <div className="body-password">
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해 주세요"
          />
          <img
            className="password-visibility"
            src={isPasswordVisible ? visibleOff : visibleOn}
            alt="toggle visibility"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className="body-button">
          <button className="button-cancel" onClick={onCancel}>
            취소
          </button>
          <button className="button-update" onClick={handleUpdateClick}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
