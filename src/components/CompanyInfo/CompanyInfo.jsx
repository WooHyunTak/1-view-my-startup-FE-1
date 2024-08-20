import { convertToUnit } from "../../utils/convertToUnit";
import "./CompanyInfo.css";

function CompanyInfo({ actualInvestment, revenue, employees, description }) {
  return (
    <div className="CompanyInfo">
      <div className="info">
        <div>
          <span>누적 투자 금액</span>
          <span>{convertToUnit(actualInvestment)}</span>
        </div>
        <div>
          <span>매출액</span>
          <span>{convertToUnit(revenue)}</span>
        </div>
        <div>
          <span>고용 인원</span>
          <span>{employees}명</span>
        </div>
      </div>

      <div className="description">
        <h3>기업소개</h3>
        <br />
        <span>{description}</span>
      </div>
    </div>
  );
}

export default CompanyInfo;
