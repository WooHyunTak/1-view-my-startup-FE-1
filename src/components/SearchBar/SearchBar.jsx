import { useState } from "react";

import searchImg from "../../assets/icon/ic_search.svg";

import "./SearchBar.css";

export function SearchBar({ setKeyword }) {
  const [search, setSearch] = useState("");

  //돋보기 아이콘 눌렀을때도 검색
  const handleSearchClick = () => {
    setKeyword("keyword", search);
  };

  const handleKeyDown = (e) => {
    //onKeyDown시 발생하는 한글조합중 입력이 2번되는문제
    // isComposing이 false일때 작동하게 (글자가 조합중이지 않을때)
    // 사용자가 글자 조합을 끝내고 enter를 쳤을때만 검색 가능
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setKeyword("keyword", search);
      console.log(search);
    }
  };

  //controlled input
  const handleValueChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    //인풋필드가 비어지면 다시 keyword=""로 리셋
    if (value.trim() === "") {
      setKeyword("keyword", "");
    }
  };

  return (
    <div className="SearchBar">
      <button onClick={handleSearchClick}>
        <img src={searchImg} alt="search icon" />
      </button>
      <input
        type="text"
        value={search}
        placeholder="검색어를 입력해주세요"
        name="search"
        onKeyDown={handleKeyDown}
        onChange={handleValueChange}
      />
    </div>
  );
}
