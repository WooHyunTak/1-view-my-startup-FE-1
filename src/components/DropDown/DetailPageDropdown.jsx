import { useEffect, useRef, useState, useContext } from "react";
import { InvestmentContext } from "../../contexts/InvestmentContext";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";
import AlertModal from "../modals/AlertModal";
import UpdateConfirmModal from "../modals/UpdateConfirmModal";
import UpdateModal from "../modals/UpdateModal";
import kebabMenu from "../../assets/icon/ic_kebab.svg";
import "./DetailPageDropdown.css";

function DetailPageDropdown({ id, password, amount, comment }) {
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateConfirmModalOpen, setIsUpdateConfirmModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [previousModal, setPreviousModal] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(false); // 삭제 상태를 관리하기 위한 상태 추가
  const { deleteInvestmentById, updateInvestmentById, version } = useContext(InvestmentContext);

  const dropDownRef = useRef(null);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setPreviousModal("delete");
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openUpdateConfirmModal = () => {
    setIsUpdateConfirmModalOpen(true);
    setPreviousModal("updateConfirm");
  };

  const closeUpdateConfirmModal = () => {
    setIsUpdateConfirmModalOpen(false);
  };

  const closeAlertModal = async () => {
    setIsAlertModalOpen(false);

    if (pendingDelete) {
      try {
        await deleteInvestmentById({ id, password });
        setPendingDelete(false);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }

    if (previousModal === "delete") {
      setIsDeleteModalOpen(true); // 삭제 모달을 다시 열기
    } else if (previousModal === "updateConfirm") {
      setIsUpdateConfirmModalOpen(false); // 업데이트 모달을 다시 열기
      setIsUpdateModalOpen(false);
    }
  };

  const confirmDelete = async (inputPassword) => {
    closeDeleteModal();

    if (!inputPassword) {
      setAlertMessage("비밀번호를 입력해 주세요");
      setIsAlertModalOpen(true);
      return;
    }

    if (inputPassword !== password) {
      setAlertMessage("잘못된 비밀번호로 삭제에 실패하셨습니다.");
      setIsAlertModalOpen(true);
      return;
    }

    setAlertMessage("삭제가 성공적으로 완료되었습니다");
    setPendingDelete(true); // 삭제 대기 상태로 설정
    setIsAlertModalOpen(true); // 삭제 성공 메시지 모달 열기
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateInvestmentById({ id, updatedData });
      setAlertMessage("업데이트가 성공적으로 완료되었습니다");
      setIsAlertModalOpen(true);
    } catch (error) {
      setAlertMessage("투자 업데이트에 실패했습니다");
      setIsAlertModalOpen(true);
    }
  };

  const confirmUpdate = ({ password: inputPassword }) => {
    if (!inputPassword) {
      setAlertMessage("비밀번호를 입력해 주세요");
      setIsAlertModalOpen(true);
      setIsUpdateConfirmModalOpen(false);
      return;
    }

    if (inputPassword !== password) {
      setAlertMessage("비밀번호가 일치하지 않습니다");
      setIsAlertModalOpen(true);
      setIsUpdateConfirmModalOpen(false);
      return;
    }

    // 비밀번호가 일치하면 UpdateModal을 엽니다.
    setIsUpdateModalOpen(true);
    setIsUpdateConfirmModalOpen(false);
  };

  // 메뉴 외부 클릭 감지 함수
  const handleClickOutside = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {}, [version]);

  return (
    <div className="DetailPageDropdown">
      <button onClick={toggleDropdown} ref={dropDownRef} className="kebab-menu">
        <img src={kebabMenu} alt="Edit button" />
      </button>
      {visible && (
        <div className="dropdown-menu">
          <button className="edit" onClick={openUpdateConfirmModal}>
            수정하기
          </button>
          <button className="delete" onClick={openDeleteModal}>
            삭제하기
          </button>
        </div>
      )}
      <UpdateConfirmModal
        isOpen={isUpdateConfirmModalOpen}
        onUpdateConfirm={confirmUpdate}
        onCancel={closeUpdateConfirmModal}
      />
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onUpdateConfirm={handleUpdate}
        onCancel={() => setIsUpdateModalOpen(false)}
        password={password}
        initialAmount={amount}
        initialComment={comment}
      />
      <DeleteConfirmModal isOpen={isDeleteModalOpen} onDeleteConfirm={confirmDelete} onCancel={closeDeleteModal} />
      <AlertModal message={alertMessage} isAlertMeg={isAlertModalOpen} onClose={closeAlertModal} />
    </div>
  );
}

export default DetailPageDropdown;
