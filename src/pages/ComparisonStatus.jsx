import { useEffect } from "react";
import { getComparisonStatus } from "../services/companyApi";
import { useApiHandler } from "../hooks/useApiHandler";
import { comparisonStatusTableHeader } from "../utils/tableTypes";
import Table from "../components/Table/Table";
import DropDown from "../components/DropDown/DropDown";
import Pagination from "../components/Pagination/Pagination";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";
import Loader from "../components/Loader/Loader";
import "./Home.css";

// 쿼리 파라미터 초기화 (기본값)
const INITIAL_QUERY_PARAMS = {
  orderBy: "selectedCount_desc",
  limit: 10,
  page: 1,
};

function ComparisonStatus() {
  const {
    loading,
    error,
    init,
    list: companyList,
    queryParams,
    totalPages,
    handleQueryParamsChange,
  } = useApiHandler(getComparisonStatus, INITIAL_QUERY_PARAMS);

  useEffect(() => {
    init();
  }, [init]);
  if (error) {
    return <ErrorMsg errorMsg={error.message} />;
  }

  return (
    <>
      {loading && <Loader />}
      <section className="ComparisonStatus">
        {!loading && companyList.length === 0 && (
          <>
            <h2>비교 현황</h2>
            <div className="empty-list">
              <p>아직 비교 현황이 없어요.</p>
            </div>
          </>
        )}
        {!loading && companyList.length > 0 && (
          <>
            <div className="top-bar">
              <h2>비교 현황</h2>
              <DropDown
                orderBy={queryParams.orderBy}
                setOrderBy={handleQueryParamsChange}
                buttonType="typeTwo"
              />
            </div>
            <Table
              list={companyList}
              tableHeaders={comparisonStatusTableHeader}
            />
            <Pagination
              setCurrentPage={handleQueryParamsChange}
              currentPage={queryParams.page}
              totalPages={totalPages}
            />
          </>
        )}
      </section>
    </>
  );
}

export default ComparisonStatus;
