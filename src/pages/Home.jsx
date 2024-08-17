import { useState, useEffect, useCallback } from "react";
import { getCompanies } from "../services/companyApi";
import { Table } from "../components/Table/Table";

function Home() {
  const [orderBy, setOrderby] = useState("");
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

  useEffect(() => {
    init();
  });

  return (
    <section className="Home">
      <div>
        <h2>전체 스타트업 목록</h2>
      </div>
      <Table list={companyList} />
    </section>
  );
}

export default Home;
