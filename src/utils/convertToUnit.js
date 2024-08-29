// 금액에 단위 붙여 변환. unit: 억, 천만원
export const convertToUnit = (value) => {
  const amount = Number(value);
  //0보다 크고 문자열에서 숫자로 맞게 변환 됐을때
  if (!isNaN(amount) && amount > 0) {
    if (amount >= 100000000) {
      return amount / 100000000 + "억";
    } else if (amount >= 10000000) {
      return amount / 10000000 + "천만";
    }
  } else {
    return "N/A";
  }
};
