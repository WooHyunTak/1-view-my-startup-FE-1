import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import MyComparison from "./pages/MyComparison";
import ComparisonStatus from "./pages/ComparisonStatus";
import InvestmentStatus from "./pages/InvestmentStatus";
import CompanyDetail from "./pages/CompanyDetail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="my-comparison" element={<MyComparison />} />
          <Route path="comparison-status" element={<ComparisonStatus />} />
          <Route path="investment-status" element={<InvestmentStatus />} />
          <Route path="companies/:companyId" element={<CompanyDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
