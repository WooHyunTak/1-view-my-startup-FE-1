import { convertToUnit } from "../../utils/convertToUnit";
import "./CompanyInfo.css";

function CompanyInfo({ actualInvestment, revenue, employees, description }) {
  return (
    <div className="CompanyInfo">
      <div className="info">
        <div>
          <span className="label-investment">누적 투자 금액</span>
          <span className="value-investment">{convertToUnit(actualInvestment)}</span>
        </div>
        <div>
          <span className="label-revenue">매출액</span>
          <span className="value-revenue">{convertToUnit(revenue)}</span>
        </div>
        <div>
          <span className="label-employees">고용 인원</span>
          <span className="value-employees">{employees}명</span>
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
