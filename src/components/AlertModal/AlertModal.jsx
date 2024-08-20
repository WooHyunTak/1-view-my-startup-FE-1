import { useRef, useEffect } from "react";
import "../AlertModal/AlertModal.css";

function AlertModal({ message = "", isAlertMeg, onClose }) {
  const dialogRef = useRef(null);

  const handleClose = () => onClose();

  useEffect(() => {
    isAlertMeg ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isAlertMeg]);

  return (
    <dialog ref={dialogRef} className="alert-modal">
      <div className="alert-modal-container">
        <div className="alert-modal-message">
          <h1>{message}</h1>
        </div>
        <div className="alert-modal-btn-container">
          <button className="alert-btn" onClick={handleClose}>
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default AlertModal;
