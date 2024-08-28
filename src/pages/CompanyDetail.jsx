import CompanyHeader from "../components/CompanyHeader/CompanyHeader";
import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import CompanyInvestmentTable from "../components/CompanyInvestmentTable/CompanyInvestmentTable";
import formatDescription from "../utils/formatDescription";
import Loader from "../components/Loader/Loader";
import ErrorMsg from "../components/ErrorMsg/ErrorMsg";
import { getCompany } from "../services/companyApi";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { InvestmentContext } from "../contexts/InvestmentContext";

import "./CompanyDetail.css";

// 쿼리 파라미터 초기화 (기본값)
const INITIAL_QUERY_PARAMS = {
  limit: 5,
  totalPages: 0,
  page: 1,
};

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

  const [queryParams, setQueryParams] = useState(INITIAL_QUERY_PARAMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { loadInvestments } = useContext(InvestmentContext);

  //쿼리 파라미터 한번에 객체로 관리
  // 쿼리 파라미터 핸들러 (name = query name, value= query value)
  const handleQueryParamsChange = (name, value) => {
    setQueryParams((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    async function fetchCompany() {
      try {
        const data = await getCompany(companyId);
        setCompanyData({
          id: data.id,
          name: data.name,
          brandColor: data.brandColor,
          categories: data.categories.map((category) => category.name),
          categoryNames: data.categories,
          actual: data.actualInvestment,
          revenue: data.revenue,
          employees: data.totalEmployees,
          description: formatDescription(data.description),
          investments: data.investments,
        });

        handleQueryParamsChange(
          "totalPages",
          Math.ceil(data.investments.length / queryParams.limit)
        );

        loadInvestments(data.investments);
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
  }, [companyId, queryParams.page, queryParams.limit, loadInvestments]);

  if (loading) return <Loader />; // 로딩 중일 때 메시지 표시
  if (error) return <ErrorMsg errorMsg={error} />; // 에러 발생 시 메시지 표시
  if (!companyData) return <div>No company data available</div>; // company가 null일 경우 처리

  // 상세페이지에 필요한 정보
  const {
    id,
    name,
    brandColor,
    categoryNames,
    categories,
    actual,
    revenue,
    employees,
    description,
    investments,
  } = companyData;
  const selectedCompany = { id, name, categories };

  return (
    <div className="CompanyDetail">
      <CompanyHeader
        name={name}
        categoryNames={categoryNames}
        brandColor={brandColor}
      />
      <CompanyInfo
        actualInvestment={actual}
        revenue={revenue}
        employees={employees}
        description={description}
      />
      <CompanyInvestmentTable
        setCurrentPage={handleQueryParamsChange}
        queryParams={queryParams}
        selectedCompany={selectedCompany}
        investments={investments}
      />
    </div>
  );
}

export default CompanyDetail;
