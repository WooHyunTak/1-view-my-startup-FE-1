import { useState, useEffect, useCallback } from "react";
import { getCompanies } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";

import { companyListTableHeader } from "../utils/tableTypes";

import "./Home.css";

function Home() {
  const [orderBy, setOrderBy] = useState("revenue_desc");
  const [companyList, setCompanyList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  // 데이터를 불러오는 함수.
  // useCallback 사용해서 필요할 때만 함수를 재생성
  const init = useCallback(async () => {
    try {
      const data = await getCompanies({ orderBy, page, limit });

      const { list, totalCount } = data;
      setCompanyList(list);
      //totalPages = 전체 페이지 버튼 수
      setTotalPages(Math.ceil(totalCount / limit));
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [orderBy, page, limit]); // orderBy, page, keyword가 변경될 때만 함수가 재생성

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
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          buttonType="typeOne"
        />
      </div>
      <Table
        list={companyList}
        tableHeaders={companyListTableHeader}
        tableName="company-list"
      />
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={totalPages}
      />
    </section>
  );
}

export default Home;
