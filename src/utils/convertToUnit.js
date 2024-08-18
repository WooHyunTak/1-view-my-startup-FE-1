// 금액에 단위 붙여 변환. unit: 억, 천만원
export const convertToUnit = (value) => {
  const amount = Number(value);
  if (amount || !NaN) {
    if (amount >= 100000000) {
      return amount / 100000000 + "억";
    } else if (amount >= 10000000) {
      return amount / 10000000 + "천만원";
    }
  } else {
    return "N/A";
  }
};
