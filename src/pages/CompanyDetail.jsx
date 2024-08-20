import CompanyHeader from "../components/CompanyHeader/CompanyHeader";
import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import CompanyInvestmentTable from "../components/CompanyInvestmentTable/CompanyInvestmentTable";

import formatDescription from "../utils/formatDescription";

import { getCompany } from "../services/companyApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./CompanyDetail.css";

function CompanyDetail() {
  const { companyId } = useParams(); // URL에서 companyId 추출
  const [companyData, setCompanyData] = useState({
    name: "",
    categoryNames: "",
    revenue: "",
    employees: "",
    description: "",
    investments: [],
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await getCompany(companyId);
        setCompanyData({
          name: data.name,
          categoryNames: data.categories
            .map((category) => category.name)
            .join(", "),
          actual: data.actualInvestment,
          revenue: data.revenue,
          employees: data.employees,
          description: formatDescription(data.description),
          investments: data.investments,
        });

        setTotalPages(Math.ceil(data.investments.length / limit));
      } catch (err) {
        setError("Failed to load company data");
        console.error(err.message);

        if (err.response) {
          console.log(err.response.status);
          console.log(err.response.data);
        }
      } finally {
        setLoading(false);
      }
    }

    // 컴포넌트가 마운트되면 데이터 가져오기 시작
    fetchCompany();
  }, [companyId, limit]);

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 메시지 표시
  if (error) return <div>{error}</div>; // 에러 발생 시 메시지 표시
  if (!companyData) return <div>No company data available</div>; // company가 null일 경우 처리

  // 상세페이지에 필요한 정보
  const {
    name,
    categoryNames,
    actual,
    revenue,
    employees,
    description,
    investments,
  } = companyData;

  // 페이지네이션 위해서 현재 페이지에 해당하는 투자 데이터 추출
  const startIdx = (page - 1) * limit;
  const currentInvestments = investments.slice(startIdx, startIdx + limit);

  // 투자 총 금액
  const totalAmount = investments
    .map((investment) => Number(investment.amount))
    .reduce((sum, amount) => sum + amount, 0);

  return (
    <div className="CompanyDetail">
      <CompanyHeader name={name} categoryNames={categoryNames} />
      <CompanyInfo
        actualInvestment={actual}
        revenue={revenue}
        employees={employees}
        description={description}
      />
      <CompanyInvestmentTable
        totalAmount={totalAmount}
        currentInvestments={currentInvestments}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default CompanyDetail;
