import { useState, useEffect } from "react";
import add_icon from "../../assets/icon/ic_add.svg";
import restart_icon from "../../assets/icon/ic_restart_white.svg";
import "./Comparison.css";
import SelectMyCompany from "../modals/SelectMyCompany.jsx";
import SelectComparisonCompany from "../modals/SelectComparisonCompany.jsx";
import ic_minus from "../../assets/icon/ic_minus.svg";
import AlertModal from "../modals/AlertModal.jsx";
import LogoImg from "../LogoImg/LogoImg.jsx";
import { useNavigate } from "react-router-dom";
import { patchCounts } from "../../services/comparisonApi.js";

//내가 선택한 기업의 정보를 리스트에 보여준다
function CompanyItem({ item }) {
  const { name, categories, brandColor, brandImage } = item;
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

//비교하고자 선택한 기업의 정보를 리스트에 보여준다
//위 컴포넌트와 디자인은 같지만 기능이 달라 별도로 분리함
function ComparisonItem({ item = {}, onDelete }) {
  const { name, categories, brandColor, brandImage } = item;

  const handleDelete = () => onDelete(item.id);

  return (
    <div className="ComparisonItem">
      <button onClick={handleDelete} className="ComparisonItem-delete">
        <img src={ic_minus} alt="삭제" />
      </button>
      <LogoImg
        size="large"
        brandImg={brandImage}
        brandName={name}
        brandColor={brandColor}
      />
      <span className="ComparisonItem-name ellipsis">{name}</span>
      <p className="ComparisonItem-categories ellipsis">{categories[0]}</p>
    </div>
  );
}

//Alert모달의 프롭으로 전달하는 메시지...
let alertMessage = "";

function Comparison() {
  const navigate = useNavigate();
  const [myCompany, setMyCompany] = useState();
  const [comparisonCompanies, setComparisonCompanies] = useState([]);
  const [selectMyCompanyOpen, setSelectMyCompanyOpen] = useState(false);
  const [selectComparisonOpen, setSelectComparisonOpen] = useState(false);
  const [alertMeg, setAlertMeg] = useState(false);
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [btnDisable, setBtnDisable] = useState(true);

  //내가 선택한 기업의 로컬스토리지저장 전의 스테이트 관리
  const handelRecentCompanies = (obj) => {
    //로컬스토리지를 5개까지 제한한다.
    if (recentCompanies.length >= 5) {
      setRecentCompanies((prev) => {
        //객체배열의 같은 아이디가 있다면 기존걸 지우고 최신화 한다.
        const nextArray = prev.filter((item) => item.id !== obj.id);
        nextArray.shift();
        nextArray.push(obj);
        return nextArray;
      });
    } else {
      setRecentCompanies((prev) => {
        const nextArray = prev.filter((item) => item.id !== obj.id);
        nextArray.push(obj);
        return nextArray;
      });
    }
    handelCloseMyCompany();
  };

  //모달 핸들링
  const handelOpenMyCompany = () => setSelectMyCompanyOpen(true);
  const handelCloseMyCompany = () => setSelectMyCompanyOpen(false);
  const handelOpenComparisonCompany = () => setSelectComparisonOpen(true);
  const handelCloseComparisonCompany = () => setSelectComparisonOpen(false);
  const handelOpenAlert = () => setAlertMeg(true);
  const handelCloseAlert = () => setAlertMeg(false);

  //내가 선택한 기업의 최신화
  const handleAddMyCompany = (obj) => {
    setMyCompany(obj);
  };

  //비교하고자 하는 기업의 상태(State) 관리
  const handleAddComparisonCompany = (obj) => {
    if (comparisonCompanies.length >= 5) {
      //5개가 선택되어 있다면 Alert모달을 호출한다.
      alertMessage = "비교하고자 하는 기업은 최대 5개 입니다.";
      handelOpenAlert();
    } else {
      setComparisonCompanies((prev) => {
        const nextArray = prev.filter((item) => item.id !== obj.id);
        nextArray.push(obj);
        return nextArray;
      });
      setBtnDisable(false);
    }
  };

  //비교기업의 객체배열의 선택한 요소 삭제
  const handleDeleteComparisonCompany = (id) => {
    setComparisonCompanies((prev) => {
      const nextArray = prev.filter((item) => item.id !== id);
      return nextArray;
    });
  };

  //나의 선택한 기업 초기화
  const handleClear = () => {
    setMyCompany();
  };

  //나의 선택한 기업과 비교기업의 초기화
  const handleAllClear = () => {
    setMyCompany();
    setComparisonCompanies([]);
  };

  const CheckInNavigate = async () => {
    const navData = {
      myCompany,
      comparisonIds: comparisonCompanies.map(({ id }) => id),
    };
    try {
      const fetchCounts = await patchCounts(navData);
      if (fetchCounts) {
        navigate("check-id-comparison", { state: navData });
      }
    } catch (error) {
      alertMessage = "기업 비교의 실패 했습니다 (비교 카운트 오류)";
      handelOpenAlert();
      console.log(error.message);
    }
  };

  //로컬스토리지 관리
  useEffect(() => {
    //렌더가 끝나면 로컬스토리지의 값을 로드한다.
    const storageItems = localStorage.getItem("localStorageSelectId");
    if (storageItems) {
      setRecentCompanies(JSON.parse(storageItems));
    }
  }, []);

  useEffect(() => {
    //최신 선택기업의 상태가 변경되면 로컬스토리지의 값을 저장한다.
    localStorage.setItem(
      "localStorageSelectId",
      JSON.stringify(recentCompanies)
    );
  }, [recentCompanies]);

  return (
    <div className="Comparison">
      <SelectMyCompany
        isOpen={selectMyCompanyOpen}
        onClose={handelCloseMyCompany}
        onAddClick={handleAddMyCompany}
        recentCompanies={recentCompanies}
        onRecentCompanies={handelRecentCompanies}
      />
      <SelectComparisonCompany
        isOpen={selectComparisonOpen}
        onClose={handelCloseComparisonCompany}
        onAddClick={handleAddComparisonCompany}
        comparisonCompanies={comparisonCompanies}
        onDeleteClick={handleDeleteComparisonCompany}
      />
      <AlertModal
        isAlertMeg={alertMeg}
        message={alertMessage}
        onClose={handelCloseAlert}
      />
      <div>
        <div className="head-container">
          <h2>나의 기업을 선택해 주세요!</h2>
          <button onClick={handleAllClear} className="reset-btn">
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
                <CompanyItem item={myCompany} />
              </>
            )}
            {!myCompany && (
              <div className="add-company">
                <button
                  onClick={handelOpenMyCompany}
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
              onClick={handelOpenComparisonCompany}
            >
              기업추가하기
            </button>
          </div>
          <div className="out-container">
            <div className="items-container">
              {comparisonCompanies.map((item) => (
                <ComparisonItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteComparisonCompany}
                />
              ))}
              {comparisonCompanies.length < 1 && (
                <p className="no-selected-comparison">
                  아직 추가한 기업이 없어요, <br />
                  버튼을 눌러 기업을 추가해보세요!
                </p>
              )}
            </div>
          </div>
          <div className="bottom-btn-container">
            <button
              onClick={CheckInNavigate}
              className={
                btnDisable ? "disable-comparison-btn" : "comparison-submit-btn"
              }
              disabled={btnDisable}
            >
              기업 비교하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comparison;
