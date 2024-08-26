import { useEffect } from "react";
import { getCompanies } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { useApiHandler } from "../hooks/useApiHandler";

// 테이블 헤더 (테이블 종류) 가져오기
import { companyListTableHeader } from "../utils/tableTypes";

import "./Home.css";

// 쿼리 파라미터 초기화 (기본값)
const INITIAL_QUERY_PARAMS = {
  orderBy: "revenue_desc",
  limit: 10,
  page: 1,
  keyword: "",
};

function Home() {
  const {
    loading,
    error,
    init,
    list: companyList,
    queryParams,
    totalPages,
    handleQueryParamsChange,
  } = useApiHandler(getCompanies, INITIAL_QUERY_PARAMS);

  // 컴포넌트가 처음 렌더링될 때,
  // 그리고 init 함수가 변경될 때 실행
  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className="Home">
      <div className="top-bar">
        <h2 className="top-bar-title">전체 스타트업 목록</h2>
        <SearchBar setKeyword={handleQueryParamsChange} />
        <DropDown orderBy={queryParams.orderBy} setOrderBy={handleQueryParamsChange} buttonType="typeOne" />
      </div>
      {loading && "로딩중"}
      {error && <span>{error.message}</span>}
      <Table list={companyList} tableHeaders={companyListTableHeader} tableName="company-list" />
      <Pagination setCurrentPage={handleQueryParamsChange} currentPage={queryParams.page} totalPages={totalPages} />
    </section>
  );
}

export default Home;
