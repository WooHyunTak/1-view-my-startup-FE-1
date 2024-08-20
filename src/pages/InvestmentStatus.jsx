import { useState, useEffect, useCallback } from "react";
import { getInvestmentStatus } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";

import { InvestmentStatusTableHeader } from "../utils/tableTypes";
import "./Home.css";

// 쿼리 파라미터 초기화 (기본값)
const INITIAL_QUERY_PARAMS = {
  orderBy: "virtualInvestment_desc",
  limit: 10,
  totalPages: 0,
  page: 1,
};

function InvestmentStatus() {
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
    const { orderBy, page, limit } = queryParams;
    try {
      const data = await getInvestmentStatus({ orderBy, page, limit });

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
  }, [queryParams]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className="InvestmentStatus">
      <div className="top-bar">
        <h2>투자 현황</h2>
        <DropDown
          orderBy={queryParams.orderBy}
          setOrderBy={handleQueryParamsChange}
          buttonType="typeThree"
        />
      </div>
      <Table list={companyList} tableHeaders={InvestmentStatusTableHeader} />

      <Pagination
        setCurrentPage={handleQueryParamsChange}
        queryParams={queryParams}
      />
    </section>
  );
}

export default InvestmentStatus;
