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
  const [alertState, setAlertState] = useState({
    message: "",
    isOpen: false,
  });
  const [modalState, setModalState] = useState({
    delete: false,
    updateConfirm: false,
    update: false,
  });
  const [pendingDelete, setPendingDelete] = useState(false);
  const { deleteInvestmentById, updateInvestmentById } = useContext(InvestmentContext);

  const dropDownRef = useRef(null);

  const toggleDropdown = () => setVisible((prev) => !prev);

  const handleModalOpen = (type) => {
    setModalState((prev) => ({ ...prev, [type]: true }));
  };

  const handleModalClose = (type) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
  };

  const handleAlertClose = async () => {
    setAlertState({ message: "", isOpen: false });

    if (pendingDelete) {
      try {
        await deleteInvestmentById({ id, password });
        setPendingDelete(false);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }

    if (modalState.update) {
      handleModalClose("update");
    }

    if (modalState.delete) {
      handleModalOpen("delete");
    } else if (modalState.updateConfirm) {
      handleModalClose("updateConfirm");
      handleModalClose("update");
    }
  };

  const confirmDelete = async (inputPassword) => {
    handleModalClose("delete");

    if (!inputPassword || inputPassword !== password) {
      setAlertState({
        message: inputPassword ? "잘못된 비밀번호로 삭제에 실패하셨습니다." : "비밀번호를 입력해 주세요",
        isOpen: true,
      });
      return;
    }

    setAlertState({ message: "삭제가 성공적으로 완료되었습니다", isOpen: true });
    setPendingDelete(true);
  };

  const confirmUpdate = ({ password: inputPassword }) => {
    handleModalClose("updateConfirm");

    if (!inputPassword || inputPassword !== password) {
      setAlertState({
        message: inputPassword ? "비밀번호가 일치하지 않습니다" : "비밀번호를 입력해 주세요",
        isOpen: true,
      });
      return;
    }

    handleModalOpen("update");
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateInvestmentById({ id, updatedData });
      setAlertState({ message: "업데이트가 성공적으로 완료되었습니다", isOpen: true });
    } catch (error) {
      setAlertState({ message: "투자 업데이트에 실패했습니다", isOpen: true });
    }
  };

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
          <button className="edit" onClick={() => handleModalOpen("updateConfirm")}>
            수정하기
          </button>
          <button className="delete" onClick={() => handleModalOpen("delete")}>
            삭제하기
          </button>
        </div>
      )}
      <UpdateConfirmModal
        isOpen={modalState.updateConfirm}
        onUpdateConfirm={confirmUpdate}
        onCancel={() => handleModalClose("updateConfirm")}
      />
      <UpdateModal
        isOpen={modalState.update}
        onUpdateConfirm={handleUpdate}
        onCancel={() => handleModalClose("update")}
        password={password}
        initialAmount={amount}
        initialComment={comment}
      />
      <DeleteConfirmModal
        isOpen={modalState.delete}
        onDeleteConfirm={confirmDelete}
        onCancel={() => handleModalClose("delete")}
      />
      <AlertModal message={alertState.message} isAlertMeg={alertState.isOpen} onClose={handleAlertClose} />
    </div>
  );
}

export default DetailPageDropdown;
