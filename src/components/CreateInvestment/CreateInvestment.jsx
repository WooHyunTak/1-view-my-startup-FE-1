import { useRef, useState, useEffect } from "react";
import ic_eyes_hidden from "../../assets/btn_visibility_on_24px-1.svg";
import ic_eyes from "../../assets/btn_visibility_on_24px.svg";
import ic_delete from "../../assets/icon/ic_delete.svg";
import default_company_img from "../../assets/default_company_img.svg";
import { createInvestment_ver_tak } from "../../services/investmentApi";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal/AlertModal";

let alertMessage = "";

function CreateInvestment({ isOpen = false, myCompany, onClose }) {
  const defaultInvestmentValues = {
    name: "",
    comment: "",
    amount: 0,
    password: "",
    companyId: myCompany.id,
  };
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const [alertMeg, setAlertMeg] = useState(false);
  const { name, categories } = myCompany;
  const [investmentValues, setInvestmentValues] = useState(
    defaultInvestmentValues
  );
  const [inputTypes, setInputTypes] = useState({
    password: "password",
    passwordConfirm: "password",
  });

  const handelOpenAlert = () => setAlertMeg(true);
  const handelCloseAlert = () => setAlertMeg(false);

  const handleChangeValues = (name, value) => {
    setInvestmentValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    handleChangeValues(name, value);
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const createInvestment = async (e) => {
    e.preventDefault();
    try {
      const data = await createInvestment_ver_tak(investmentValues);
      if (data) {
        navigate(`/companies/${data.companyId}`);
      } else {
        alertMessage = `기업투자의 실패했습니다.`;
        handelOpenAlert();
      }
    } catch (error) {
      alertMessage = `기업투자의 실패했습니다. (${error})`;
      handelOpenAlert();
    }
  };

  const handleVisiblePassword = (name, e) => {
    e.preventDefault();
    setInputTypes((prev) => ({
      ...prev,
      [name]: prev[name] === "text" ? "password" : "text",
    }));
  };

  //모달 다이얼로그 Ref 관리 -> 모달 open상태와 API호루 쿼리의 의존성 부여
  useEffect(() => {
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal-company">
      <AlertModal
        isAlertMeg={alertMeg}
        message={alertMessage}
        onClose={handelCloseAlert}
      />
      <div className="modal-container">
        <div className="modal-header">
          <h2>기업에 투자하기</h2>
          <img onClick={handleClose} src={ic_delete} alt="닫기 이미지" />
        </div>
        <div className="modal-my-company-container">
          <h2>투자 기업 정보</h2>
          <div className="item-list-container">
            <div className="item-content-container">
              <img
                className="select-company-modal-img"
                src={default_company_img}
                alt="기업 기본 이미지"
              />
              <p className="select-company-modal-name">{name}</p>
              <div className="select-company-modal-categories">
                <p>{categories[0]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-company-container">
          <form className="modal-form-container">
            <div className="modal-label-container">
              <label>투자자 이름</label>
              <input
                name="name"
                onChange={onChange}
                className="modal-input"
                placeholder="투자자 이름을 입력해 주세요"
              ></input>
            </div>
            <div className="modal-label-container">
              <label>투자 금액</label>
              <input
                name="amount"
                onChange={onChange}
                className="modal-input"
                placeholder="투자 금액을 입력해 주세요"
                autoComplete="off"
              ></input>
            </div>
            <div className="modal-label-container">
              <label>투자 코멘트</label>
              <textarea
                name="comment"
                onChange={onChange}
                className="modal-textarea"
                placeholder="투자에 대한 코멘트를 입력해 주세요"
                autoComplete="off"
              ></textarea>
            </div>
            <div className="modal-label-container">
              <label>비밀번호</label>
              <input
                name="password"
                type={inputTypes.password}
                onChange={onChange}
                className="modal-input"
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="new-password"
              ></input>
              <button
                className="modal-password-visible"
                onClick={(e) => handleVisiblePassword("password", e)}
              >
                <img src={ic_eyes} alt="비밀번호 보기" />
              </button>
            </div>
            <div className="modal-label-container">
              <label>비밀번호 확인</label>
              <input
                name="passwordConfirm"
                type={inputTypes.passwordConfirm}
                // onChange={onChange}
                className="modal-input"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                autoComplete="new-password"
              ></input>
              <button
                className="modal-password-visible"
                onClick={(e) => handleVisiblePassword("passwordConfirm", e)}
              >
                <img src={ic_eyes} alt="비밀번호 보기" />
              </button>
            </div>
            <div className="modal-btn-container">
              <button onClick={handleClose} className="modal-close-btn">
                취소
              </button>
              <button onClick={createInvestment} className="modal-complete-btn">
                투자하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default CreateInvestment;
