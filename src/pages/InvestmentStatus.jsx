import { useEffect } from "react";
import { getInvestmentStatus } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";
import { useApiHandler } from "../hooks/useAsyncHandler";

import { InvestmentStatusTableHeader } from "../utils/tableTypes";
import "./Home.css";

// 쿼리 파라미터 초기화 (기본값)
const INITIAL_QUERY_PARAMS = {
  orderBy: "virtualInvestment_desc",
  limit: 10,
  page: 1,
};

function InvestmentStatus() {
  const {
    loading,
    error,
    init,
    list: companyList,
    queryParams,
    totalPages,
    handleQueryParamsChange,
  } = useApiHandler(getInvestmentStatus, INITIAL_QUERY_PARAMS);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className="InvestmentStatus">
      {companyList.length === 0 && (
        <>
          <h2>투자 현황</h2>
          <div className="empty-list">
            <p>아직 투자 현황이 없어요.</p>
          </div>
        </>
      )}
      {companyList.length > 0 && (
        <>
          <div className="top-bar">
            <h2>투자 현황</h2>
            <DropDown
              orderBy={queryParams.orderBy}
              setOrderBy={handleQueryParamsChange}
              buttonType="typeThree"
            />
          </div>
          {loading && "로딩중"}
          {error && <span>{error.message}</span>}
          <Table
            list={companyList}
            tableHeaders={InvestmentStatusTableHeader}
          />

          <Pagination
            setCurrentPage={handleQueryParamsChange}
            currentPage={queryParams.page}
            totalPages={totalPages}
          />
        </>
      )}
    </section>
  );
}

export default InvestmentStatus;
