import { useEffect, useRef, useState } from "react";
import { getCompanies } from "../../services/companyApi.js";
import ic_delete from "../../assets/icon/ic_delete.svg";
import ic_search from "../../assets/icon/ic_search.svg";
import default_company_img from "../../assets/default_company_img.svg";
import Pagination from "../Pagination/Pagination.jsx";
import "../../utils/globalModal.css";

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
  totalPages: 0,
};
function SelectMyCompany({
  isOpen = false,
  onClose,
  onAddClick,
  recentCompanies,
  onRecentCompanies,
}) {
  const [queryObj, setQueryObj] = useState(defaultParams);
  const [Companies, setCompanies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const dialogRef = useRef(null);

  const handleClose = () => onClose();

  //최신 선택기업리스트를 로컬스토리지로 저장전에 State로 우선 관리한다.
  const handleStorage = (obj) => {
    onRecentCompanies(obj);
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

  //검색 키워드 인풋 핸들러
  const handleKeywordClear = () => setKeyword();
  const handleKeywordSearch = (event) => handleSubmit(event);

  const handleSearch = async () => {
    if (!isOpen) return;
    try {
      const { list, totalCount = 0 } = await getCompanies(queryObj);
      setCompanies(list);
      setTotalCount(totalCount);
      setTotalPages(Math.ceil(totalCount / queryObj.limit));
    } catch (error) {
      console.log(error.message);
    }
  };

  //모달 다이얼로그 Ref 관리 -> 모달 open상태와 API호루 쿼리의 의존성 부여
  useEffect(() => {
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
    handleSearch();
  }, [isOpen, queryObj]);

  // useEffect(() => {
  //   handleSearch();
  // }, [queryObj]);

  return (
    <dialog ref={dialogRef} className="modal-company">
      <div className="modal-container">
        <div className="modal-header">
          <h2>나의 기업 선택하기</h2>
          <img onClick={handleClose} src={ic_delete} alt="닫기 이미지" />
        </div>
        <div className="modal-search-company-container">
          <form onSubmit={handleSubmit}>
            <input
              name="keyword"
              value={keyword || ""}
              onChange={handleKeyword}
              className="modal-input"
              placeholder="기업명을 입력해 주세요"
            ></input>
          </form>
          <div className="search-img-container">
            <button className="search-company-reset-btn">
              <img
                onClick={handleKeywordClear}
                className="search-company-reset"
                src={ic_delete}
                alt="검색지우기 이미지"
              />
            </button>
            <button className="search-company-reset-btn">
              <img
                onClick={handleKeywordSearch}
                className="search-company-search"
                src={ic_search}
                alt="조회 이미지"
              />
            </button>
          </div>
        </div>
        <h2>최근 선택된 기업 ({recentCompanies.length})</h2>
        {recentCompanies.map((item) => (
          <CompaniesList
            key={item.id}
            companyItem={item}
            onStorage={handleStorage}
            onAddClick={onAddClick}
          ></CompaniesList>
        ))}
        {!recentCompanies && <h3>선택한 기업이 없습니다.</h3>}
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
        <Pagination
          setCurrentPage={handleValues}
          currentPage={queryObj.page}
          totalPages={totalPages}
          size="small"
        />
      </div>
    </dialog>
  );
}

export default SelectMyCompany;
