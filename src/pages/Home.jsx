import { useState, useEffect, useCallback } from "react";
import { getCompanies } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";

import "./Home.css";

function Home() {
  const [orderBy, setOrderBy] = useState("");
  const [keyword, setKeyword] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [lastId, setLastId] = useState("");
  const [hasNext, setHasNext] = useState(0);

  const init = useCallback(async () => {
    try {
      const data = await getCompanies({ keyword, orderBy, lastId });

      const { list, nextCursor } = data;
      setCompanyList(list);
      setHasNext(data.length);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [orderBy, keyword, lastId]);

  const tableHeaders = [
    { colName: "순위", className: "rank", field: "rank" },
    { colName: "기업명", className: "company-name", field: "name" },
    {
      colName: "기업소개",
      className: "company-description",
      field: "description",
    },
    { colName: "카테고리", className: "category", field: "categories" },
    {
      colName: "누적 투자 금액",
      className: "actual-investment",
      field: "actualInvestment",
    },
    { colName: "매출액", className: "revenue", field: "revenue" },
    {
      colName: "고용인원",
      className: "total-employees",
      field: "totalEmployees",
    },
  ];

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
      <Table list={companyList} tableHeaders={tableHeaders} />
    </section>
  );
}

export default Home;
