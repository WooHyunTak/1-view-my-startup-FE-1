import { useState, useEffect } from "react";
import defaultImg from "../assets/default_company_img.svg";
import AlertModal from "../components/AlertModal/AlertModal.jsx";
import { DropDown } from "../components/DropDown/DropDown.jsx";
import * as api from "../services/comparisonApi.js";
import { ComparisonTableHeader } from "../utils/tableTypes.js";
import { Table } from "../components/Table/Table.jsx";

//내가 선택한 기업의 정보를 리스트에 보여준다
function CompanyItem({ item }) {
  const { name, categories } = item;
  return (
    <div className="CompanyItem">
      <img className="CompanyItem-img" src={defaultImg} alt="기업 이미지" />
      <h2 className="CompanyItem-name ellipsis">{name}</h2>
      <p className="CompanyItem-categories ellipsis">{categories}</p>
    </div>
  );
}

//Alert모달의 프롭으로 전달하는 메시지...
let alertMessage = "";

const defaultParams = {
  sortBy: "revenue",
  order: "asc",
};

function CheckInComparison({ myCompany = {}, comparisonIds = [] }) {
  const [alertMeg, setAlertMeg] = useState(false);
  const [comparisonParams, setComparisonParams] = useState(defaultParams);
  const [rankParams, setRankParams] = useState(defaultParams);
  const [comparisonItem, setComparisonItem] = useState([]);
  const [comparisonRankItem, setComparisonRankItem] = useState([]);

  const reqComparison = {
    comparisonIds: comparisonIds,
  };

  //모달 핸들링
  const handelOpenAlert = () => setAlertMeg(true);
  const handelCloseAlert = () => setAlertMeg(false);

  //API호출
  const loadComparisonData = async () => {
    try {
      const data = await api.getComparison(comparisonParams, reqComparison);
      setComparisonItem(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadComparisonRankData = async () => {
    try {
      const data = await api.getComparisonRank(rankParams, myCompany.id);
      setComparisonRankItem(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   useEffect(() => {
  //     loadComparisonData();
  //     loadComparisonRankData();
  //   }, []);

  return (
    <div className="CheckInComparison">
      <AlertModal
        isAlertMeg={alertMeg}
        message={alertMessage}
        onClose={handelCloseAlert}
      />
      <div>
        <div className="head-container">
          <h2>내가 선택한 기업</h2>
          <button className="comparison-btn">다른 기업 비교하기</button>
        </div>
        <div className="out-container">
          <div className="items-container">
            {myCompany && (
              <>
                <CompanyItem item={myCompany} />
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="head-container">
          <h2>비교 결과 확인하기</h2>
          {/* <DropDown /> */}
        </div>
        <div>
          <Table
            list={comparisonItem}
            tableHeaders={ComparisonTableHeader}
            //   tableName="company-list"
          />
        </div>
      </div>

      <div>
        <div className="head-container">
          <h2>기업 순위 확인하기</h2>
          {/* <DropDown /> */}
        </div>
        <div>
          <Table
            list={comparisonItem}
            tableHeaders={ComparisonTableHeader}
            //   tableName="company-list"
          />
        </div>
      </div>

      <div className="bottom-btn-container">
        <button className="comparison-submit-btn">기업 비교하기</button>
      </div>
    </div>
  );
}

export default CheckInComparison;
