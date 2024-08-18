// value는 setOrder()에 넣어줄 값
// label은 dropdown 버튼에 보여질 부분
const typeOneOptions = [
  { value: "actualInvestment_desc", label: "누적 투자금액 높은순" },
  { value: "actualInvestment_asc", label: "누적 투자금액 낮은순" },
  { value: "revenue_desc", label: "매출액 높은순" },
  { value: "revenue_asc", label: "매출액 낮은순" },
  { value: "totalEmployees_desc", label: "고용 인원 많은순" },
  { value: "totalEmployees_asc", label: "고용 인원 적은순" },
];

//orderBy하나로 상태 관리 하기때문에 fetch에 필요한 요청쿼리 2개를 이어줌
//호출 Api에서 나눠줄 예정
// ?orderBy=selectedCount&scending=asc
const typeTwoOptions = [
  { value: "selectedCount_desc", label: "나의 기업 선택 횟수 높은순" },
  { value: "selectedCount_asc", label: "나의 기업 선택 횟수 낮은순" },
  { value: "actualInvestment_desc", label: "실제 누적 투자 금액 높은순" },
  { value: "actualInvestment_asc", label: "실제 누적 투자 금액 낮은순" },
];

//?sortBy=virtualInvestment?order=desc
const typeThreeOptions = [
  {
    value: "virtualInvestment_desc",
    label: "View My Startup 투자 금액 높은순",
  },
  { value: "virtualInvestment_asc", label: "View My Startup 투자 금액 낮은순" },
  { value: "actualInvestment_desc", label: "실제 누적 투자 금액 높은순" },
  { value: "actualInvestment_asc", label: "실제 누적 투자 금액 낮은순" },
];

// 더 필요한 드롭다운 있다면 type{넘버}Options로 정의 후 optionsByType에 추가.
// defaultSort = 기본 정렬 (페이지 맨 처음에 fetch될 기본 정렬 이름)
//typeOne 은 small / typeTwo, typeThree는 large 여야함
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
