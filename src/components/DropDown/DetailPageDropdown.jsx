import { useEffect, useRef, useState, useContext } from "react";
import { InvestmentContext } from "../../contexts/InvestmentContext";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";
import AlertModal from "../modals/AlertModal";
import UpdateConfirmModal from "../modals/UpdateConfirmModal";
import UpdateModal from "../modals/UpdateModal";
import kebabMenu from "../../assets/icon/ic_kebab.svg";
import "./DetailPageDropdown.css";

function DetailPageDropdown({ id, password, amount, comment }) {
  // 상태 변수 선언
  const [visible, setVisible] = useState(false); // 드롭다운 메뉴의 가시성 관리
  const [alertMessage, setAlertMessage] = useState(""); // 알림 메시지 관리
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false); // 알림 모달의 가시성 관리
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 확인 모달의 가시성 관리
  const [isUpdateConfirmModalOpen, setIsUpdateConfirmModalOpen] = useState(false); // 업데이트 확인 모달의 가시성 관리
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // 업데이트 모달의 가시성 관리
  const [previousModal, setPreviousModal] = useState(null); // 이전에 열렸던 모달을 추적하기 위한 상태
  const [pendingDelete, setPendingDelete] = useState(false); // 삭제 대기 상태 관리

  const { deleteInvestmentById, updateInvestmentById, version } = useContext(InvestmentContext);
  const dropDownRef = useRef(null); // 드롭다운 메뉴 참조

  // 드롭다운 메뉴의 가시성을 토글하는 함수
  const toggleDropdown = () => {
    setVisible(!visible);
  };

  // 삭제 모달을 여는 함수
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setPreviousModal("delete"); // 이전 모달로 삭제 모달을 설정
  };

  // 삭제 모달을 닫는 함수
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // 업데이트 확인 모달을 여는 함수
  const openUpdateConfirmModal = () => {
    setIsUpdateConfirmModalOpen(true);
    setPreviousModal("updateConfirm"); // 이전 모달로 업데이트 확인 모달을 설정
  };

  // 업데이트 확인 모달을 닫는 함수
  const closeUpdateConfirmModal = () => {
    setIsUpdateConfirmModalOpen(false);
  };

  // 알림 모달을 닫는 함수
  const closeAlertModal = async () => {
    setIsAlertModalOpen(false);

    // 삭제가 대기 중인 경우 삭제 작업 수행
    if (pendingDelete) {
      try {
        await deleteInvestmentById({ id, password });
        setPendingDelete(false);
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    }

    // 이전 모달이 'delete'이거나 'updateConfirm'이면 해당 모달을 다시 엽니다.
    if (previousModal === "delete" && !pendingDelete) {
      setIsDeleteModalOpen(true);
    } else if (previousModal === "updateConfirm" && !isUpdateModalOpen) {
      setIsUpdateConfirmModalOpen(true);
    }
  };

  // 삭제 확인 처리 함수
  const confirmDelete = async (inputPassword) => {
    closeDeleteModal();

    if (!inputPassword) {
      setAlertMessage("비밀번호를 입력해 주세요");
      setIsAlertModalOpen(true); // 비밀번호가 없는 경우 알림 모달 열기
      return;
    }

    if (inputPassword !== password) {
      setAlertMessage("잘못된 비밀번호로 삭제에 실패하셨습니다.");
      setIsAlertModalOpen(true); // 비밀번호가 틀린 경우 알림 모달 열기
      return;
    }

    setAlertMessage("삭제가 성공적으로 완료되었습니다");
    setPendingDelete(true); // 삭제 대기 상태 설정
    setIsAlertModalOpen(true); // 삭제 성공 메시지 모달 열기
  };

  // 업데이트 처리 함수
  const handleUpdate = async (updatedData) => {
    try {
      await updateInvestmentById({ id, updatedData });
      setAlertMessage("업데이트가 성공적으로 완료되었습니다");
      setIsUpdateModalOpen(false); // 업데이트 성공 시 업데이트 모달을 닫음
      setPreviousModal(null); // 이전 모달 정보를 초기화하여 다시 열리지 않도록 함
      setIsAlertModalOpen(true); // 알림 모달 열기
    } catch (error) {
      setAlertMessage("투자 업데이트에 실패했습니다");
      setIsAlertModalOpen(true); // 업데이트 실패 시 알림 모달 열기
    }
  };

  // 업데이트 확인 처리 함수
  const confirmUpdate = ({ password: inputPassword }) => {
    if (!inputPassword) {
      setAlertMessage("비밀번호를 입력해 주세요");
      setIsAlertModalOpen(true); // 비밀번호가 없는 경우 알림 모달 열기
      setIsUpdateConfirmModalOpen(false);
      return;
    }

    if (inputPassword !== password) {
      setAlertMessage("비밀번호가 일치하지 않습니다");
      setIsAlertModalOpen(true); // 비밀번호가 틀린 경우 알림 모달 열기
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

  // 외부 클릭 감지 이벤트 리스너 추가 및 제거
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
