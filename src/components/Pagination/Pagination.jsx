import { useCallback } from "react";
import prevBtnIcon from "../../assets/icon/ic_arrow_left.svg";
import nextBtnIcon from "../../assets/icon/ic_arrow_right.svg";

import "./Pagination.css";

// page, setPage를 currentPage, setCurrentPage로 내려줌
export function Pagination({ setCurrentPage, queryParams, totalPages, size }) {
  //page이름 currentPage로 re-assign
  const { page: currentPage } = queryParams;

  let pageNumbers = [];

  let startPage;
  let endPage;

  //totalPages가 5개 이하 아닌이상 항상 5개 버튼 보여주도록 함
  // currentPage가 3이상일때 부터 중앙정렬
  if (currentPage < 3) {
    startPage = 1;
    //totalPages가 5보다 아래면 totalPages가 끝번호
    endPage = Math.min(totalPages, 5);
  } else if (currentPage >= totalPages - 2) {
    startPage = totalPages - 4;
    endPage = totalPages;
    //기본 currentPage 중앙정렬
  } else {
    startPage = currentPage - 2;
    endPage = Math.min(currentPage + 2, totalPages);
  }

  //항상 startPage 1이상이고 , endPage는 totalPages 이하도록
  startPage = Math.max(1, startPage);
  endPage = Math.min(totalPages, endPage);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  //각 함수에 useCallback 추가함 (렌더링시 의존 배열이 바뀌지 않았다면 함수 재랜덩 방지)
  const handlePageClick = useCallback(
    (pageNum) => {
      if (pageNum !== currentPage) {
        setCurrentPage("page", pageNum);
      }
    },
    [setCurrentPage, currentPage]
  );

  //이전 버튼 -1씩 이동
  const prevBtnClick = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage({ page: currentPage - 1 });
    }
  }, [setCurrentPage, currentPage]);

  // 다음 버튼 +1씩 이동
  const nextBtnClick = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage("page", currentPage + 1);
    }
  }, [setCurrentPage, currentPage, totalPages]);

  return (
    <ul className={`Pagination ${size}`}>
      <li>
        <button onClick={prevBtnClick} disabled={currentPage <= 1}>
          <img src={prevBtnIcon} alt="left button" />
        </button>
      </li>
      {pageNumbers.map((pageNum) => {
        //현재 페이지 버튼에 isActive = true로 'active' className 부여해 스타일링
        const isActive = pageNum === currentPage;
        return (
          <li key={pageNum}>
            <button
              onClick={() => handlePageClick(pageNum)}
              className={isActive ? "active" : ""}
            >
              {pageNum}
            </button>
          </li>
        );
      })}
      <li>
        <button onClick={nextBtnClick} disabled={currentPage >= totalPages}>
          <img src={nextBtnIcon} alt="right button" />
        </button>
      </li>
    </ul>
  );
}
