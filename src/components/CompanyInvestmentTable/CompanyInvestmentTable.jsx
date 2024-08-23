import { Pagination } from "../Pagination/Pagination";
import { Table } from "../Table/Table";
import { investmentTableHeader } from "../../utils/tableTypes";
import { convertToUnit } from "../../utils/convertToUnit";

import "./CompanyInvestmentTable.css";
import { useContext } from "react";
import { InvestmentContext } from "../../contexts/InvestmentContext";

function CompanyInvestmentTable({ setCurrentPage, queryParams }) {
  const { investments } = useContext(InvestmentContext);

  // 투자 총 금액
  const totalAmount = investments
    .map((investment) => Number(investment.amount))
    .reduce((sum, amount) => sum + amount, 0);

  // 페이지네이션 위해서 현재 페이지에 해당하는 투자 데이터 추출
  const startIdx = (queryParams.page - 1) * queryParams.limit;
  const currentInvestments = investments.slice(
    startIdx,
    startIdx + queryParams.limit
  );

  return (
    <div className="CompanyInvestmentTable">
      <div className="head">
        <span>View My StartUp에서 받은 투자</span>
        <button>기업투자하기</button>
      </div>
      <div className="body">
        <span className="amount">총 {convertToUnit(totalAmount)} 원</span>
        <Table
          list={currentInvestments}
          tableHeaders={investmentTableHeader}
          tableName="investment-list"
          isCompanyTable={false}
        />
        <Pagination setCurrentPage={setCurrentPage} queryParams={queryParams} />
      </div>
    </div>
  );
}

export default CompanyInvestmentTable;
