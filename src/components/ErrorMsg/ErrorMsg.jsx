import "./ErrorMsg.css";

export default function ErrorMsg({ errorMsg = "오류가 발생했습니다" }) {
  return (
    <div className="ErrorMsg">
      <span>
        <span className="error">ERROR:</span> {errorMsg}
      </span>
    </div>
  );
}
