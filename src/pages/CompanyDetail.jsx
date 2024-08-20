import "./CompanyDetail.css";
import CompanyHeader from "../components/CompanyHeader/CompanyHeader";
import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import formatDescription from "../utils/formatDescription";

import { getCompany } from "../services/companyApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./CompanyDetail.css";

function CompanyDetail() {
  const { companyId } = useParams(); // URL에서 companyId 추출
  const [company, setCompany] = useState(null); // 회사 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await getCompany(companyId);
        setCompany(data);
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
  }, [companyId]); // companyId가 변결될 때마다 다시 실행

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 메시지 표시
  if (error) return <div>{error}</div>; // 에러 발생 시 메시지 표시
  if (!company) return <div>No company data available</div>; // company가 null일 경우 처리

  // 상세페이지에 필요한 정보
  const name = company.name;
  const categoryNames = company.categories
    .map((category) => category.name)
    .join(", ");
  const actualInvestment = company.actualInvestment;
  const revenue = company.revenue;
  const employees = company.totalEmployees;
  const description = formatDescription(company.description);

  return (
    <div className="CompanyDetail">
      <CompanyHeader name={name} categoryNames={categoryNames} />
      <CompanyInfo
        actualInvestment={actualInvestment}
        revenue={revenue}
        employees={employees}
        description={description}
      />
    </div>
  );
}

export default CompanyDetail;
