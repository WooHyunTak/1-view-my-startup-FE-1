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
  const [isUpdateConfirmModalOpen, setIsUpdateConfirmModalOpen] =
    useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [previousModal, setPreviousModal] = useState(null);
  const { deleteInvestmentById, updateInvestmentById } =
    useContext(InvestmentContext);

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

  const closeAlertModal = () => {
    setIsAlertModalOpen(false);
    if (shouldReload) {
      window.location.reload();
    } else if (previousModal === "delete") {
      setIsDeleteModalOpen(true); // 삭제 모달을 다시 열기
    } else if (previousModal === "updateConfirm") {
      setIsUpdateConfirmModalOpen(true); // 업데이트 모달을 다시 열기
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

    try {
      await deleteInvestmentById({ id, password: inputPassword });
      setAlertMessage("삭제가 성공적으로 완료되었습니다");
      setIsAlertModalOpen(true);
      setShouldReload(true);
    } catch (error) {
      setAlertMessage("삭제에 실패했습니다");
      setIsAlertModalOpen(true);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateInvestmentById({ id, updatedData });
      setAlertMessage("업데이트가 성공적으로 완료되었습니다");
      setIsAlertModalOpen(true);
      setShouldReload(true);
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
      {isUpdateConfirmModalOpen && (
        <UpdateConfirmModal
          onUpdateConfirm={confirmUpdate}
          onCancel={closeUpdateConfirmModal}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateModal
          onUpdateConfirm={handleUpdate}
          onCancel={() => setIsUpdateModalOpen(false)}
          password={password}
          initialAmount={amount}
          initialComment={comment}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          onDeleteConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
      )}
      <AlertModal
        message={alertMessage}
        isAlertMeg={isAlertModalOpen}
        onClose={closeAlertModal}
      />
    </div>
  );
}

export default DetailPageDropdown;
