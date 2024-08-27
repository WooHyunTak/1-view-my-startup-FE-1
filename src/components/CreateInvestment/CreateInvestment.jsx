import { useRef, useState, useEffect } from "react";
import ic_eyes_hidden from "../../assets/btn_visibility_on_24px-1.svg";
import ic_eyes from "../../assets/btn_visibility_on_24px.svg";
import ic_delete from "../../assets/icon/ic_delete.svg";
import default_company_img from "../../assets/default_company_img.svg";
import { createInvestment_ver_tak } from "../../services/investmentApi";
import { useNavigate } from "react-router-dom";
import AlertModal from "../AlertModal/AlertModal";
import useFormValidation from "../../hooks/useFormValidation";

function CreateInvestment({ isOpen = false, myCompany, onClose }) {
  const dialogRef = useRef(null);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const { name, categories } = myCompany;
  const [inputTypes, setInputTypes] = useState({
    password: "password",
    passwordConfirm: "password",
  });
  const [error, setError] = useState("");

  const { values, errors, disabled, handleChange, handleSubmit } =
    useFormValidation({
      name: "",
      amount: 0,
      comment: "",
      password: "",
    });

  const onChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "passwordConfirm") {
      validationPassword(value);
    }
  };

  const validationPassword = (confirmPassword) => {
    if (values.password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
    } else {
      setError("");
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose(); // 모든 창을 닫습니다.
  };

  const createInvestment = async (e) => {
    e.preventDefault();
    const succeed = handleSubmit(e);
    if (succeed) {
      try {
        values.companyId = myCompany.id;
        const data = await createInvestment_ver_tak(values);
        if (data) {
          setAlertMessage("투자가 성공했습니다.");
          setIsAlertModalOpen(true);
        } else {
          setAlertMessage("기업 투자가 실패했습니다.");
          setIsAlertModalOpen(true);
        }
      } catch (error) {
        setAlertMessage(`기업 투자가 실패했습니다. (${error})`);
        setIsAlertModalOpen(true);
      }
    } else {
      return;
    }
  };

  const handleVisiblePassword = (name, e) => {
    e.preventDefault();
    setInputTypes((prev) => ({
      ...prev,
      [name]: prev[name] === "text" ? "password" : "text",
    }));
  };

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
    if (alertMessage === "투자가 성공했습니다.") {
      onClose(); // 성공 메시지 후 모든 창을 닫습니다.
      const currentUrl = window.location.pathname; //현재 위치하고 있는 url를 가지고 온다.
      //현재 위치가 기업의 상세페이지라면 리로드 아니라면 기업상세로 이동
      if (currentUrl === `/companies/${myCompany.id}`) {
        window.location.reload();
      } else {
        navigate(`/companies/${myCompany.id}`);
      }
    }
  };

  // 모달 다이얼로그 Ref 관리 -> 모달 open 상태와 API 호출 쿼리의 의존성 부여
  useEffect(() => {
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal-company">
      <AlertModal
        isAlertMeg={isAlertModalOpen}
        message={alertMessage}
        onClose={closeAlertModal}
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
                onChange={handleChange}
                value={values.name || ""}
                className="modal-input"
                placeholder="투자자 이름을 입력해 주세요"
              ></input>
            </div>
            {errors.name && <p style={{ color: "orange" }}>{errors.name}</p>}
            <div className="modal-label-container">
              <label>투자 금액</label>
              <input
                name="amount"
                onChange={handleChange}
                value={values.amount || ""}
                className="modal-input"
                placeholder="투자 금액을 입력해 주세요"
                autoComplete="off"
              ></input>
            </div>
            {errors.amount && (
              <p style={{ color: "orange" }}>{errors.amount}</p>
            )}
            <div className="modal-label-container">
              <label>투자 코멘트</label>
              <textarea
                name="comment"
                onChange={handleChange}
                value={values.comment || ""}
                className="modal-textarea"
                placeholder="투자에 대한 코멘트를 입력해 주세요"
                autoComplete="off"
              ></textarea>
            </div>
            {errors.comment && (
              <p style={{ color: "orange" }}>{errors.comment}</p>
            )}
            <div className="modal-label-container">
              <label>비밀번호</label>
              <input
                name="password"
                type={inputTypes.password}
                onChange={handleChange}
                value={values.password || ""}
                className="modal-input"
                placeholder="비밀번호를 입력해 주세요"
                autoComplete="new-password"
              ></input>
              <button
                className="modal-password-visible"
                onClick={(e) => handleVisiblePassword("password", e)}
              >
                <img
                  src={
                    inputTypes.password === "text" ? ic_eyes_hidden : ic_eyes
                  }
                  alt="비밀번호 보기"
                />
              </button>
            </div>
            {errors.password && (
              <p style={{ color: "orange" }}>{errors.password}</p>
            )}
            <div className="modal-label-container">
              <label>비밀번호 확인</label>
              <input
                name="passwordConfirm"
                type={inputTypes.passwordConfirm}
                onChange={onChange}
                className="modal-input"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                autoComplete="new-password"
              ></input>
              <button
                className="modal-password-visible"
                onClick={(e) => handleVisiblePassword("passwordConfirm", e)}
              >
                <img
                  src={
                    inputTypes.passwordConfirm === "text"
                      ? ic_eyes_hidden
                      : ic_eyes
                  }
                  alt="비밀번호 보기"
                />
              </button>
            </div>
            {error && <p style={{ color: "orange" }}>{error}</p>}
            <div className="modal-btn-container">
              <button onClick={handleClose} className="modal-close-btn">
                취소
              </button>
              <button
                onClick={createInvestment}
                className={
                  disabled
                    ? "modal-complete-btn-disabled"
                    : "modal-complete-btn"
                }
                disabled={disabled}
              >
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
