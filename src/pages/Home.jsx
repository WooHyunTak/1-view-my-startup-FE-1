import { useState, useEffect, useCallback } from "react";
import { getCompanies } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";

import { companyListTableHeader } from "../utils/tableTypes";

import "./Home.css";

// 쿼리 파라미터 초기화 (기본값)
const INITIAL_QUERY_PARAMS = {
  orderBy: "revenue_desc",
  limit: 10,
  totalPages: 0,
  page: 1,
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

  // 데이터를 불러오는 함수.
  // useCallback 사용해서 필요할 때만 함수를 재생성
  const init = useCallback(async () => {
    const { orderBy, page, limit } = queryParams;
    try {
      const data = await getCompanies({ orderBy, page, limit });

      const { list, totalCount } = data;
      setCompanyList(list);
      handleQueryParamsChange("totalPages", Math.ceil(totalCount / limit));
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [queryParams]); // orderBy, page, keyword가 변경될 때만 함수가 재생성

  // 컴포넌트가 처음 렌더링될 때,
  // 그리고 init 함수가 변결될 때 실행
  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className="Home">
      <div className="top-bar">
        <h2>전체 스타트업 목록</h2>
        <DropDown
          orderBy={queryParams.orderBy}
          setOrderBy={handleQueryParamsChange}
          buttonType="typeOne"
        />
      </div>
      <Table
        list={companyList}
        tableHeaders={companyListTableHeader}
        tableName="company-list"
      />
      <Pagination
        setCurrentPage={handleQueryParamsChange}
        queryParams={queryParams}
      />
    </section>
  );
}

export default Home;
