import { useState, useEffect, useCallback } from "react";
import { getCompanies } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchBar } from "../components/SearchBar/SearchBar";

// 테이블 헤더 (테이블 종류) 가져오기
import { companyListTableHeader } from "../utils/tableTypes";

import "./Home.css";

// 쿼리 파라미터 초기화 (기본값)
const INITIAL_QUERY_PARAMS = {
  orderBy: "revenue_desc",
  limit: 10,
  page: 1,
  keyword: "",
  totalPages: 0,
};

function Home() {
  const [companyList, setCompanyList] = useState([]);
  const [queryParams, setQueryParams] = useState(INITIAL_QUERY_PARAMS);

  //쿼리 파라미터 한번에 객체로 관리
  // 쿼리 파라미터 핸들러 (name = query name, value= query value)
  const handleQueryParamsChange = (name, value) => {
    setQueryParams((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const init = useCallback(async () => {
    const { orderBy, page, limit, keyword } = queryParams;
    try {
      const data = await getCompanies({ orderBy, page, limit, keyword });

      const { list, totalCount } = data;
      setCompanyList(list);
      const newTotalPages = Math.ceil(totalCount / limit);
      if (queryParams.totalPages !== newTotalPages) {
        handleQueryParamsChange("totalPages", newTotalPages);
      }
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [queryParams]); // queryParams가 변경될 때만 init 함수가 실행되도록 설정

  // // 컴포넌트가 처음 렌더링될 때,
  // // 그리고 init 함수가 변결될 때 실행
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
      <Table list={companyList} tableHeaders={companyListTableHeader} tableName="company-list" />
      <Pagination setCurrentPage={handleQueryParamsChange} queryParams={queryParams} />
    </section>
  );
}

export default Home;
