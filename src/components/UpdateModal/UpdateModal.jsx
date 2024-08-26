import "./UpdateModal.css";
import cancelBtn from "../../assets/icon/ic_delete.svg";

import { useState } from "react";

function UpdateModal({ onUpdateConfirm, onCancel, password }) {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const handleUpdateClick = () => {
    onUpdateConfirm({ amount, comment, password });
  };

  return (
    <div className="UpdateModal">
      <div className="updateModal-head">
        <div className="head-title">
          <h3>수정하기</h3>
          <img className="cancel-button" src={cancelBtn} alt="cancel button img" onClick={onCancel} />
        </div>
      </div>

      <div className="updateModal-body">
        <label>투자 금액</label>
        <input
          type="text"
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
        <div className="body-button">
          <button className="button-update" onClick={handleUpdateClick}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
