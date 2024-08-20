import { Pagination } from "../Pagination/Pagination";
import { Table } from "../Table/Table";
import { investmentTableHeader } from "../../utils/tableTypes";
import { convertToUnit } from "../../utils/convertToUnit";

import "./CompanyInvestmentTable.css";

function CompanyInvestmentTable({
  totalAmount,
  currentInvestments,
  page,
  setPage,
  totalPages,
}) {
  return (
    <div className="CompanyInvestmentTable">
      <div className="head">
        <span>View My StartUp에서 받은 투자</span>
        <button>기업투자하기</button>
      </div>
      <div className="table-body">
        <span className="amount">총 {convertToUnit(totalAmount)} 원</span>
        <Table
          list={currentInvestments}
          tableHeaders={investmentTableHeader}
          tableName="investment-list"
        />
        <Pagination
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={totalPages}
          size="small"
        />
      </div>
    </div>
  );
}

export default CompanyInvestmentTable;
