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

function Comparison() {
  const [myCompany, setMyCompany] = useState();
  const [comparisonCompanies, setComparisonCompanies] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [resentCompanies, setResentCompanies] = useState([]);

  const handelResentCompanies = (obj) => {
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
    setMyCompany(obj);
  };

  const handleClick = () => {};

  const handleClear = () => {
    setMyCompany();
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
      />
      <div>
        <div className="head-container">
          <h2>나의 기업을 선택해 주세요!</h2>
          <button className="comparison-btn">
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
                <button onClick={handelOpenDialog} className="add-company-btn">
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
            <button className="comparison-btn">기업추가하기</button>
          </div>
          <div className="out-container">
            <div className="items-container"></div>
          </div>
          <div className="bottom-btn-container">
            <button className="comparison-submit-btn" onClick={handleClick}>
              기업 비교하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comparison;
