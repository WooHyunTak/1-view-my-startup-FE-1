// description을 문장 단위로 분리하여 공백 줄 추가
function formatDescription(description) {
  return description.split(/(?<=[.!?"])\s+/).map((sentence, index) => (
    <span key={index}>
      {sentence}
      <br />
      <br />
    </span>
  ));
}

export default formatDescription;
