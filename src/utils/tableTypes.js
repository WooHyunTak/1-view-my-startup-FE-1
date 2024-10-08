//테이블 헤더 정의, 이 테이블 헤더 기준으로 테이블과 테이블 데이터 렌더링.
//prop으로 내려줄 tableHeaders <Table tableHeaders={companyListTableHeader}/>
export const companyListTableHeader = [
  { colName: "순위", className: "rank", field: "rank" },
  { colName: "기업명", className: "company-name", field: "name" },
  {
    colName: "기업소개",
    className: "company-description",
    field: "description",
  },
  { colName: "카테고리", className: "category", field: "categories" },
  {
    colName: "누적 투자 금액",
    className: "actual-investment",
    field: "actualInvestment",
  },
  { colName: "매출액", className: "revenue", field: "revenue" },
  {
    colName: "고용인원",
    className: "total-employees",
    field: "totalEmployees",
  },
];

//투자현황 페이지 테이블 헤더
export const InvestmentStatusTableHeader = [
  { colName: "순위", className: "rank", field: "rank" },
  { colName: "기업명", className: "company-name", field: "name" },
  {
    colName: "기업소개",
    className: "company-description",
    field: "description",
  },
  { colName: "카테고리", className: "category", field: "categories" },

  {
    colName: "View My Startup 투자 금액",
    className: "virtual-investment",
    field: "virtualInvestment",
  },
  {
    colName: "실제 누적 투자 금액",
    className: "actual-investment",
    field: "actualInvestment",
  },
];

//비교현황 페이지 테이블 헤더
export const comparisonStatusTableHeader = [
  { colName: "순위", className: "rank", field: "rank" },
  { colName: "기업명", className: "company-name", field: "name" },
  {
    colName: "기업소개",
    className: "company-description",
    field: "description",
  },
  { colName: "카테고리", className: "category", field: "categories" },
  {
    colName: "나의 기업 선택 횟수",
    className: "selected-count",
    field: "selectedCount",
  },
  {
    colName: "비교 기업 선택 횟수",
    className: "compared-count",
    field: "comparedCount",
  },
];

//비교결과 테이블 헤더
export const ComparisonTableHeader = [
  { colName: "기업명", className: "company-name", field: "name" },
  {
    colName: "기업소개",
    className: "company-description",
    field: "description",
  },
  { colName: "카테고리", className: "category", field: "categories" },
  {
    colName: "누적 투자 금액",
    className: "actual-investment",
    field: "actualInvestment",
  },
  { colName: "매출액", className: "revenue", field: "revenue" },
  {
    colName: "고용인원",
    className: "total-employees",
    field: "totalEmployees",
  },
];

//기업 상세 투자자 테이블
export const investmentTableHeader = [
  { colName: "투자자 이름", className: "investor-name", field: "name" },
  { colName: "순위", className: "investment-rank", field: "rank" },
  {
    colName: "투자 금액",
    className: "investment-amount",
    field: "amount",
  },

  {
    colName: "투자 코멘트",
    className: "investment-comment",
    field: "comment",
  },
];
