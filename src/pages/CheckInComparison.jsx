import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ComparisonTableHeader,
  companyListTableHeader,
} from "../utils/tableTypes.js";
import AlertModal from "../components/modals/AlertModal.jsx";
import DropDown from "../components/DropDown/DropDown.jsx";
import CreateInvestment from "../components/modals/CreateInvestment.jsx";
import Table from "../components/Table/Table.jsx";
import LogoImg from "../components/LogoImg/LogoImg.jsx";
import * as api from "../services/comparisonApi.js";
import "./CheckInComparison.css";

//내가 선택한 기업의 정보를 리스트에 보여준다
function CompanyItem({ item }) {
  const { name, categories, brandImage, brandColor } = item;
  return (
    <div className="CompanyItem">
      <LogoImg
        size="large"
        brandImg={brandImage}
        brandName={name}
        brandColor={brandColor}
      />
      <h2 className="CompanyItem-name ellipsis">{name}</h2>
      <p className="CompanyItem-categories ellipsis">{categories}</p>
    </div>
  );
}

//Alert모달의 프롭으로 전달하는 메시지...

const defaultParams = {
  orderBy: "revenue_desc",
};

function CheckInComparison() {
  const location = useLocation();
  // const { myCompany, comparisonIds = [] } = location.state || {};

  // useMemo로 location.state를 메모이제이션
  const state = useMemo(() => location.state || {}, [location.state]);
  // state에서 myCompany와 comparisonIds를 구조 분해 할당
  const { myCompany, comparisonIds = [] } = state;

  const [alertMeg, setAlertMeg] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [comparisonParams, setComparisonParams] = useState(defaultParams);
  const [rankParams, setRankParams] = useState(defaultParams);
  const [comparisonItem, setComparisonItem] = useState([]);
  const [comparisonRankItem, setComparisonRankItem] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  const handleComparisonParams = (name, value) => {
    setComparisonParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRankParams = (name, value) => {
    setRankParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //모달 핸들링
  const handelOpenAlert = () => setAlertMeg(true);
  const handelCloseAlert = () => setAlertMeg(false);
  const handelOpenCreateModal = () => setCreateModal(true);
  const handelCloseCreateModal = () => setCreateModal(false);

  //API호출
  const loadComparison = useCallback(async () => {
    try {
      const reqComparison = {
        comparisonIds: [...comparisonIds, myCompany.id],
      };
      const data = await api.getComparison(comparisonParams, reqComparison);
      setComparisonItem(data);
    } catch (error) {
      setAlertMessage(error.message);
      handelOpenAlert();
      console.log(error.message);
    }
  }, [comparisonParams, comparisonIds, myCompany.id]);

  const loadComparisonRack = useCallback(async () => {
    try {
      const data = await api.getComparisonRank(rankParams, myCompany);
      setComparisonRankItem(data);
    } catch (error) {
      setAlertMessage(error.message);
      handelOpenAlert();
      console.log(error.message);
    }
  }, [rankParams, myCompany]);

  useEffect(() => {
    loadComparison();
  }, [loadComparison]);

  useEffect(() => {
    loadComparisonRack();
  }, [loadComparisonRack]);

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className="CheckInComparison">
          <CreateInvestment
            isOpen={createModal}
            myCompany={myCompany}
            onClose={handelCloseCreateModal}
          />
          <AlertModal
            isAlertMeg={alertMeg}
            message={alertMessage}
            onClose={handelCloseAlert}
          />
          <div className="top-section">
            <div className="head-container">
              <h2>내가 선택한 기업</h2>
              <Link to={"/my-comparison"}>
                <button className="check-in-different-btn check-in-btn">
                  다른 기업 비교하기
                </button>
              </Link>
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
              <DropDown
                orderBy={comparisonParams.orderBy}
                setOrderBy={handleComparisonParams}
                buttonType="typeOne"
              />
            </div>
            <div>
              <Table
                list={comparisonItem}
                tableHeaders={ComparisonTableHeader}
                isCompanyTable={false}
              />
            </div>
          </div>

        <div>
          <div className="head-container">
            <h2>기업 순위 확인하기</h2>
            <DropDown
              orderBy={rankParams.orderBy}
              setOrderBy={handleRankParams}
              buttonType="typeOne"
            />
          </div>
          <div>
            <Table
              list={comparisonRankItem}
              tableHeaders={companyListTableHeader}
              isCompanyTable={false}
            />
          </div>
        </div>

        <div className="bottom-btn-container">
          <button
            onClick={handelOpenCreateModal}
            className="check-in-investment-btn check-in-btn"
          >
            나의 기업에 투자하기
          </button>
        </div>
      </div>
    </>
  );
}

export default CheckInComparison;
