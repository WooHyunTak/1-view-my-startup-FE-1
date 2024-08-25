import { useEffect, useRef, useState, useContext } from "react";
import { InvestmentContext } from "../../contexts/InvestmentContext";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import UpdateModal from "../UpdateModal/UpdateModal";
import kebabMenu from "../../assets/icon/ic_kebab.svg";
import "./DetailPageDropdown.css";

function DetailPageDropdown({ id, password }) {
  const [visible, setVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { deleteInvestmentById, updateInvestmentById } = useContext(InvestmentContext);

  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const confirmDelete = async (inputPassword) => {
    if (!inputPassword) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }

    if (inputPassword !== password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await deleteInvestmentById({ id, password: inputPassword });
      alert("삭제가 성공적으로 완료되었습니다.");
      setIsDeleteModalOpen(false);
    } catch (error) {
      alert("삭제에 실패했습니다.");
    }
  };

  const confirmUpdate = async (updatedData) => {
    const { password: inputPassword } = updatedData;

    if (!inputPassword) {
      alert("비밀번호를 입력해 주세요.");
      return;
    }
    if (inputPassword !== password) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await updateInvestmentById({ id, updatedData });
      alert("업데이트가 성공적으로 완료되었습니다.");
      setIsUpdateModalOpen(false);
      window.location.reload();
    } catch (error) {
      alert("투자 업데이트에 실패했습니다.");
      return;
    }
  };

  // 메뉴 외부 클릭 감지 함수
  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    // 외부 클릭 감시 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="DetailPageDropdown">
      <button onClick={toggleDropdown} ref={dropDownRef} className="edit-btn">
        <img src={kebabMenu} alt="Edit button" />
      </button>
      {visible && (
        <div className="dropdown-menu">
          <button className="edit" onClick={openUpdateModal}>
            수정하기
          </button>
          <button className="delete" onClick={openDeleteModal}>
            삭제하기
          </button>
        </div>
      )}
      {isUpdateModalOpen && <UpdateModal onUpdateConfirm={confirmUpdate} onCancel={closeUpdateModal} />}
      {isDeleteModalOpen && <DeleteConfirmModal onDeleteConfirm={confirmDelete} onCancel={closeDeleteModal} />}
    </div>
  );
}

export default DetailPageDropdown;
