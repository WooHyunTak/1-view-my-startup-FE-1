import { useState } from "react";
import { convertToUnit } from "../../utils/convertToUnit";
import { investmentTableHeader } from "../../utils/tableTypes";
import Pagination from "../Pagination/Pagination";
import Table from "../Table/Table";
import CreateInvestment from "../modals/CreateInvestment";

import "./CompanyInvestmentTable.css";

function CompanyInvestmentTable({
  setCurrentPage,
  queryParams,
  selectedCompany,
  investments,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handelOpenCreateModal = () => setIsModalOpen(true);
  const handelCloseCreateModal = () => setIsModalOpen(false);

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
        <button onClick={handelOpenCreateModal}>기업투자하기</button>
      </div>
      <div className="body">
        {investments.length === 0 ? (
          <p>
            아직 투자한 기업이 없어요, <br />
            버튼을 눌러 기업에 투자해보세요!
          </p>
        ) : (
          <>
            <span className="amount">총 {convertToUnit(totalAmount)} 원</span>
            <Table
              list={currentInvestments}
              tableHeaders={investmentTableHeader}
              tableName="investment-list"
              isCompanyTable={false}
            />
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={queryParams.page}
              totalPages={queryParams.totalPages}
            />
          </>
        )}
      </div>
      {isModalOpen && (
        <CreateInvestment
          isOpen={isModalOpen}
          myCompany={selectedCompany}
          onClose={handelCloseCreateModal}
        />
      )}
    </div>
  );
}

export default CompanyInvestmentTable;
