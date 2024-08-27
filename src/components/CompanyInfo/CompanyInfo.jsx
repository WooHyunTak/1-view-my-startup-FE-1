import { convertToUnit } from "../../utils/convertToUnit";
import "./CompanyInfo.css";

function CompanyInfo({ actualInvestment, revenue, employees, description }) {
  return (
    <div className="CompanyInfo">
      <div className="info">
        <div>
          <span class="label-investment">누적 투자 금액</span>
          <span class="value-investment">{convertToUnit(actualInvestment)}</span>
        </div>
        <div>
          <span class="label-revenue">매출액</span>
          <span class="value-revenue">{convertToUnit(revenue)}</span>
        </div>
        <div>
          <span class="label-employees">고용 인원</span>
          <span class="value-employees">{employees}명</span>
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
