import { useState } from "react";
import add_icon from "../../assets/icon/ic_add.svg";
import restart_icon from "../../assets/icon/ic_restart.svg";
import "./comparison.css";

function MyCompanyModal() {
  return <div></div>;
}

function Comparison() {
  const [myCompany, setMyCompany] = useState();
  const [comparisonCompanies, setComparisonCompanies] = useState([]);

  const handleClick = () => {};

  return (
    <div className="Comparison">
      <div>
        <div className="head-container">
          <h2>나의 기업을 선택해 주세요!</h2>
          <button className="comparison-btn">
            <img src={restart_icon} alt="초기화" />
            전체 초기화
          </button>
        </div>
        <div className="out-container">
          <div className="items-container">
            {myCompany && <p className="cancel-btn">선택 취소</p>}
            {!myCompany && (
              <div className="add-company">
                <button className="add-company-btn">
                  <img src={add_icon} alt="기업추가하기아이콘" />
                </button>
                <p>기업 추가</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {myCompany && (
        <div>
          <div className="head-container">
            <h2>어떤 기업이 궁금하세요? (최대 5개)</h2>
            <button className="comparison-btn">기업추가하기</button>
          </div>
          <div className="out-container">
            <div className="items-container"></div>
          </div>
          <div className="bottom-btn-container">
            <button className="comparison-submit-btn" onClick={handleClick}>
              기업 비교하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comparison;
