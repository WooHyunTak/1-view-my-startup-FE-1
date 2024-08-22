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
  page: 1,
  totalPages: 0,
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
  }, [queryParams]);

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
          <Table
            list={companyList}
            tableHeaders={InvestmentStatusTableHeader}
          />

          <Pagination
            setCurrentPage={handleQueryParamsChange}
            queryParams={queryParams}
          />
        </>
      )}
    </section>
  );
}

export default InvestmentStatus;
