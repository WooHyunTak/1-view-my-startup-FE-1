import { useCallback, useEffect, useRef, useState } from "react";
import { getCompanies } from "../../services/companyApi.js";
import ic_delete from "../../assets/icon/ic_delete.svg";
import ic_search from "../../assets/icon/ic_search.svg";
import ic_check from "../../assets/icon/ic_check.svg";
import Pagination from "../Pagination/Pagination.jsx";
import LogoImg from "../LogoImg/LogoImg.jsx";
import "./globalModal.css";

function CompaniesList({
  companyItem = {},
  onAddClick,
  comparisonCompaniesItems = [],
}) {
  const { name, categories, brandImage, brandColor } = companyItem;

  //비교기업의 해당 요소를 추가한다.
  const onCompanyClick = () => {
    onAddClick(companyItem);
  };

  return (
    <div className="item-list-container">
      <div className="item-content-container">
        <LogoImg
          size="medium"
          brandImg={brandImage}
          brandName={name}
          brandColor={brandColor}
        />
        <p className="select-company-modal-name">{name}</p>
        <div className="select-company-modal-category">
          <p>{categories[0]}</p>
        </div>
      </div>
      {/* 선택한 기업이 기존의 비교기업리스트에 있다면 선택완료를 렌더링한다. */}
      {comparisonCompaniesItems.some((item) => item.id === companyItem.id) ? (
        <button onClick={onCompanyClick} className="selected-company-modal-btn">
          <img src={ic_check} alt="선택완료" />
          선택완료
        </button>
      ) : (
        <button onClick={onCompanyClick} className="select-company-modal-btn">
          선택하기
        </button>
      )}
    </div>
  );
}

function SelectedCompaniesList({ companyItem = {}, onDeleteClick }) {
  const { name, categories, brandImage, brandColor } = companyItem;

  //비교기업리스트의 해당 요소를 삭제한다.
  const handleDeleteClick = () => {
    onDeleteClick(companyItem.id);
  };

  return (
    <div className="item-list-container">
      <div className="item-content-container">
        <LogoImg
          size="medium"
          brandImg={brandImage}
          brandName={name}
          brandColor={brandColor}
        />
        <p className="select-company-modal-name">{name}</p>
        <div className="select-company-modal-category">
          <p>{categories[0]}</p>
        </div>
      </div>
      <button onClick={handleDeleteClick} className="delete-company-modal-btn">
        선택 해제
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

function SelectComparisonCompany({
  isOpen,
  onClose,
  onAddClick,
  onDeleteClick,
  comparisonCompanies = [],
}) {
  const [queryObj, setQueryObj] = useState(defaultParams);
  const [Companies, setCompanies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const dialogRef = useRef(null);

  const handleClose = () => onClose();

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

  const handleSearch = useCallback(async () => {
    if (!isOpen) return;
    try {
      const { list, totalCount = 0 } = await getCompanies(queryObj);
      setCompanies(list);
      setTotalCount(totalCount);
      setTotalPages(Math.ceil(totalCount / queryObj.limit));
    } catch (error) {
      console.log(error.message);
    }
  }, [isOpen, queryObj]);

  //검색 키워드 인풋 핸들러
  const handleKeywordClear = () => {
    setKeyword();
    handleValues("keyword", "");
  };
  const handleKeywordSearch = (event) => handleSubmit(event);

  //모달 다이얼로그 Ref 관리 -> 모달 open상태와 API호루 쿼리의 의존성 부여
  useEffect(() => {
    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
    handleSearch();
  }, [isOpen, handleSearch]);

  return (
    <dialog ref={dialogRef} className="modal-company">
      <div className="modal-container">
        <div className="modal-header">
          <h2>비교할 기업 선택하기</h2>
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
              autoComplete="off"
            ></input>
          </form>
          <div className="input-btns-container">
            <button className="reset-btn">
              <img
                onClick={handleKeywordClear}
                src={ic_delete}
                alt="검색지우기 이미지"
              />
            </button>
            <button className="search-btn">
              <img
                onClick={handleKeywordSearch}
                src={ic_search}
                alt="조회 이미지"
              />
            </button>
          </div>
        </div>
        <h3>선택한 기업 ({comparisonCompanies.length})</h3>
        <div className="modal-item-list-container">
          {comparisonCompanies.map((item) => (
            <SelectedCompaniesList
              key={item.id}
              companyItem={item}
              onDeleteClick={onDeleteClick}
            ></SelectedCompaniesList>
          ))}
        </div>
        {!comparisonCompanies && <h3>선택한 기업이 없습니다.</h3>}
        <h3>검색 결과 ({totalCount})</h3>
        <div className="modal-item-list-container">
          {Companies.map((item) => (
            <CompaniesList
              key={item.id}
              companyItem={item}
              comparisonCompaniesItems={comparisonCompanies}
              onAddClick={onAddClick}
            ></CompaniesList>
          ))}
        </div>
        {!Companies.length && <h3>기업정보가 없습니다.</h3>}
        <Pagination
          setCurrentPage={handleValues}
          currentPage={queryObj.page}
          totalPages={totalPages}
          size="small"
        />
        <div className="modal-btn-container">
          <button onClick={handleClose} className="modal-complete-btn">
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default SelectComparisonCompany;
