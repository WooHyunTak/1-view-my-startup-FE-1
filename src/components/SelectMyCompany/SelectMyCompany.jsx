import { useEffect, useRef, useState } from "react";
import ic_delete from "../../assets/icon/ic_delete.svg";
import ic_search from "../../assets/icon/ic_search.svg";
import default_company_img from "../../assets/default_company_img.svg";
import "./SelectMyCompany.css";
import { getCompanies } from "../../services/companyApi.js";
import { Pagination } from "../Pagination/Pagination.jsx";

function CompaniesList({ companyItem = {}, onStorage, onAddClick }) {
  const { name, categories } = companyItem;

  //로컬스토리지 저장과 나의 기업 상태를 저장한다.
  const onCompanyClick = () => {
    onStorage(companyItem);
    onAddClick(companyItem);
  };

  return (
    <div className="item-list-container">
      <div className="item-content-container">
        <img
          className="select-company-modal-img"
          src={default_company_img}
          alt="기업 기본 이미지"
        />
        <p className="select-company-modal-name">{name}</p>
        <div className="select-company-modal-categories">
          <p>{categories[0]}</p>
        </div>
      </div>
      <button onClick={onCompanyClick} className="select-company-modal-btn">
        선택하기
      </button>
    </div>
  );
}

//API 호출 기본값
const defaultParams = {
  page: 1,
  limit: 5,
};

function SelectMyCompany({
  isOpen = false,
  onClose,
  onAddClick,
  resentCompanies,
  onResentCompanies,
}) {
  const [queryObj, setQueryObj] = useState(defaultParams);
  const [Companies, setCompanies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const dialogRef = useRef(null);

  const handleClose = () => onClose();

  //최신 선택기업리스트를 로컬스토리지로 저장전에 State로 우선 관리한다.
  const handleStorage = (obj) => {
    onResentCompanies(obj);
  };

  const handleValues = (name, value) => {
    setQueryObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleValues("keyword", keyword);
  };

  const handleSearch = async () => {
    try {
      const { list, totalCount = 0 } = await getCompanies(queryObj);
      setCompanies(list);
      setTotalCount(totalCount);
    } catch (error) {
      console.log(error.message);
    }
  };

  //모달 다이얼로그 Ref 관리 -> 모달 open상태와 API호루 쿼리의 의존성 부여
  useEffect(() => {
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
    handleSearch();
  }, [isOpen, queryObj]);

  return (
    <dialog ref={dialogRef} className="select-comparison-company">
      <div className="select-comparison-modal-container">
        <div className="select-comparison-modal-header">
          <h2>나의 기업 선택하기</h2>
          <img onClick={handleClose} src={ic_delete} alt="닫기 이미지" />
        </div>
        <div className="search-company-container">
          <form onSubmit={handleSubmit}>
            <input
              name="keyword"
              onChange={handleKeyword}
              className="search-company-input"
              placeholder="기업명을 입력해 주세요"
            ></input>
          </form>
          <div className="search-img-container">
            <img
              className="search-company-reset"
              src={ic_delete}
              alt="검색지우기 이미지"
            />
            <img
              className="search-company-search"
              src={ic_search}
              alt="조회 이미지"
            />
          </div>
        </div>
        <h2>최근 선택된 기업 ({resentCompanies.length})</h2>
        {resentCompanies.map((item) => (
          <CompaniesList
            key={item.id}
            companyItem={item}
            onStorage={handleStorage}
            onAddClick={onAddClick}
          ></CompaniesList>
        ))}
        {!resentCompanies && <h3>선택한 기업이 없습니다.</h3>}
        <h2>검색 결과 ({totalCount})</h2>
        {Companies.map((item) => (
          <CompaniesList
            key={item.id}
            companyItem={item}
            onStorage={handleStorage}
            onAddClick={onAddClick}
          ></CompaniesList>
        ))}
        {!Companies.length && <h3>기업정보가 없습니다.</h3>}
      </div>
      <Pagination></Pagination>
    </dialog>
  );
}

export default SelectMyCompany;
