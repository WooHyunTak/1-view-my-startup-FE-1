import "./UpdateModal.css";
import cancelBtn from "../../assets/icon/ic_delete.svg";

import { useState, useEffect } from "react";

function UpdateModal({ onUpdateConfirm, onCancel, password, initialAmount, initialComment }) {
  const [amount, setAmount] = useState(initialAmount || "");
  const [comment, setComment] = useState(initialComment || "");
  const [isAmountFocused, setIsAmountFocused] = useState(false);
  const [isCommentFocused, setIsCommentFocused] = useState(false);

  // 컴포넌트가 마운트될 때 초기 값을 설정
  useEffect(() => {
    setAmount(initialAmount || "");
    setComment(initialComment || "");
  }, [initialAmount, initialComment]);

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
          onFocus={() => setIsAmountFocused(true)}
          onBlur={() => setIsAmountFocused(false)}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="투자 금액을 입력해 주세요"
          className={isAmountFocused || !amount ? "input-active" : "input-filled"}
        />
        <label>투자 코멘트</label>
        <textarea
          value={comment}
          onFocus={() => setIsCommentFocused(true)}
          onBlur={() => setIsCommentFocused(false)}
          onChange={(e) => setComment(e.target.value)}
          placeholder="투자에 대한 코멘트를 입력해 주세요"
          className={isCommentFocused || !comment ? "input-active" : "input-filled"}
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
