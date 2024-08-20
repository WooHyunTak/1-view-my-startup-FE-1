import { useState, useEffect } from "react";
import add_icon from "../../assets/icon/ic_add.svg";
import restart_icon from "../../assets/icon/ic_restart.svg";
import "./comparison.css";
import SelectComparisonCompany from "../SelectComparisonCompany/SelectComparisonCompany";
import defaultImg from "../../assets/default_company_img.svg";

function CompanyItem({ items }) {
  const { name, categories } = items;
  return (
    <div className="CompanyItem">
      <img className="CompanyItem-img" src={defaultImg} alt="기업 이미지" />
      <h2 className="CompanyItem-name">{name}</h2>
      <p className="CompanyItem-categories">{categories}</p>
    </div>
  );
}

const myCompanyModalObj = {
  type: "myCompany",
  title: "나의 기업 선택하기",
  subTitle: "최근 선택된 기업",
  items: [],
};

const comparisonModalObj = {
  type: "comparison",
  title: "비교할 기업 선택하기",
  subTitle: "선택한 기업",
  items: [],
};

function Comparison() {
  const [myCompany, setMyCompany] = useState();
  const [comparisonCompanies, setComparisonCompanies] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resentCompanies, setResentCompanies] = useState([]);
  const [modalContent, setModalContent] = useState(myCompanyModalObj);

  const handelResentCompanies = (obj) => {
    if (modalContent.type !== "myCompany") return;
    if (resentCompanies.length > 5) {
      setResentCompanies((prev) => {
        const nextArray = prev.filter((item) => item.id !== obj.id);
        nextArray.shift();
        nextArray.push(obj);
        return nextArray;
      });
    } else {
      setResentCompanies((prev) => {
        const nextArray = prev.filter((item) => item.id !== obj.id);
        nextArray.push(obj);
        return nextArray;
      });
    }
    handelCloseDialog();
  };

  const handelOpenDialog = () => {
    setDialogOpen(true);
  };

  const handelCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddMyCompany = (obj) => {
    if (modalContent.type === "myCompany") {
      setMyCompany(obj);
    } else {
      console.log(obj);
      setComparisonCompanies((prev) => [...prev, obj]);
    }
  };

  const handleClear = () => {
    setMyCompany();
  };

  const handleAllClear = () => {
    setMyCompany();
    setComparisonCompanies([]);
  };

  const onModalValues = (obj) => {
    setModalContent(obj);
  };

  const handleOpenComparisonModal = () => {
    comparisonModalObj.items = comparisonCompanies;
    onModalValues(comparisonModalObj);
    console.log(comparisonModalObj);
    handelOpenDialog();
  };

  const handleOpenMyCompanyModal = () => {
    myCompanyModalObj.items = resentCompanies;
    onModalValues(myCompanyModalObj);
    handelOpenDialog();
  };

  useEffect(() => {
    const storageItems = localStorage.getItem("localStorageSelectId");
    if (storageItems) {
      setResentCompanies(JSON.parse(storageItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "localStorageSelectId",
      JSON.stringify(resentCompanies)
    );
  }, [resentCompanies]);

  return (
    <div className="Comparison">
      <SelectComparisonCompany
        isOpen={dialogOpen}
        onClose={handelCloseDialog}
        onAddClick={handleAddMyCompany}
        resentCompanies={resentCompanies}
        onResentCompanies={handelResentCompanies}
        content={modalContent}
      />
      <div>
        <div className="head-container">
          <h2>나의 기업을 선택해 주세요!</h2>
          <button onClick={handleAllClear} className="comparison-btn">
            <img src={restart_icon} alt="초기화" />
            전체 초기화
          </button>
        </div>
        <div className="out-container">
          <div className="items-container">
            {myCompany && (
              <>
                <p onClick={handleClear} className="cancel-btn">
                  선택 취소
                </p>
                <CompanyItem items={myCompany} />
              </>
            )}
            {!myCompany && (
              <div className="add-company">
                <button
                  onClick={handleOpenMyCompanyModal}
                  className="add-company-btn"
                >
                  <img src={add_icon} alt="기업추가하기아이콘" />
                </button>
                <p>기업 추가</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {myCompany && (
        <div>
          <div className="head-container">
            <h2>어떤 기업이 궁금하세요? (최대 5개)</h2>
            <button
              className="comparison-btn"
              onClick={handleOpenComparisonModal}
            >
              기업추가하기
            </button>
          </div>
          <div className="out-container">
            <div className="items-container"></div>
          </div>
          <div className="bottom-btn-container">
            <button className="comparison-submit-btn">기업 비교하기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comparison;
