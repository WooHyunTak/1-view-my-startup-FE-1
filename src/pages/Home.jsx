import { useState, useEffect, useCallback } from "react";
import { getCompanies } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";

import { companyListTableHeader } from "../utils/tableTypes";

import "./Home.css";

function Home() {
  const [orderBy, setOrderBy] = useState("revenue_desc");
  const [companyList, setCompanyList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [cursor, setCursor] = useState("");
  const [nextCursor, setNextCursor] = useState(null);

  const init = useCallback(async () => {
    try {
      const data = await getCompanies({ orderBy, cursor });

      const { list, nextCursor } = data;
      setCompanyList(list);
      setNextCursor(nextCursor || null);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [orderBy, cursor]);

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
    </section>
  );
}

export default Home;
