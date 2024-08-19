import { useState, useEffect, useCallback } from "react";
import { getSelectionStatus } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";
import { Pagination } from "../components/Pagination/Pagination";

import { comparisonStatusTableHeader } from "../utils/tableTypes";
import "./Home.css";

function ComparisonStatus() {
  const [orderBy, setOrderBy] = useState("selectedCount_desc");
  const [companyList, setCompanyList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const init = useCallback(async () => {
    try {
      const data = await getSelectionStatus({ orderBy, page, limit });

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
  }, [orderBy, page, limit]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className="Home">
      <div className="top-bar">
        <h2>비교 현황</h2>
        <DropDown
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          buttonType="typeTwo"
        />
      </div>
      <Table list={companyList} tableHeaders={comparisonStatusTableHeader} />
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={totalPages}
      />
    </section>
  );
}

export default ComparisonStatus;
