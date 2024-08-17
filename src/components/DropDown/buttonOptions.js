const typeOneOptions = [
  { value: "highestInvestment", label: "누적 투자금액 높은순" },
  { value: "lowestInvestment", label: "누적 투자금액 낮은순" },
  { value: "highestRevenue", label: "매출액 높은순" },
  { value: "lowestRevenue", label: "매출액 낮은순" },
  { value: "highestEmployees", label: "고용 인원 많은순" },
  { value: "lowestEmployees", label: "고용 인원 적은순" },
];

const typeTwoOptions = [
  { value: "selectedCount_desc", label: "나의 기업 선택 횟수 높은순" },
  { value: "selectedCount_asc", label: "나의 기업 선택 횟수 낮은순" },
  { value: "actualInvestment_desc", label: "실제 누적 투자 금액 높은순" },
  { value: "actualInvestment_asc", label: "실제 누적 투자 금액 낮은순" },
];

const typeThreeOptions = [
  {
    value: "virtualInvestment_desc",
    label: "View My Startup 투자 금액 높은순",
  },
  { value: "virtualInvestment_asc", label: "View My Startup 투자 금액 낮은순" },
  { value: "actualInvestment_desc", label: "실제 누적 투자 금액 높은순" },
  { value: "actualInvestment_asc", label: "실제 누적 투자 금액 낮은순" },
];

export const optionsByType = {
  typeOne: {
    options: typeOneOptions,
    size: "small",
    defaultSort: "매출액 높은순",
  },
  typeTwo: {
    options: typeTwoOptions,
    size: "large",
    defaultSort: "나의 기업 선택 횟수 높은순",
  },
  typeThree: {
    options: typeThreeOptions,
    size: "large",
    defaultSort: "View My Startup 투자 금액 높은순",
  },
};
