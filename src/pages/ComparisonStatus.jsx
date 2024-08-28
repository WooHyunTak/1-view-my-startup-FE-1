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

  return (
    <section className="ComparisonStatus">
      <div className="top-bar">
        <h2>비교 현황</h2>
        <DropDown
          orderBy={queryParams.orderBy}
          setOrderBy={handleQueryParamsChange}
          buttonType="typeTwo"
        />
        {loading && <Loader />}
      </div>
      <Table list={companyList} tableHeaders={comparisonStatusTableHeader} />
      {error && <ErrorMsg errorMsg={error.message} />}
      <Pagination
        setCurrentPage={handleQueryParamsChange}
        currentPage={queryParams.page}
        totalPages={totalPages}
      />
    </section>
  );
}

export default ComparisonStatus;
