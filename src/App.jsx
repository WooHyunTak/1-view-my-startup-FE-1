import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import MyComparison from "./pages/MyComparison";
import ComparisonStatus from "./pages/ComparisonStatus";
import InvestmentStatus from "./pages/InvestmentStatus";
import CompanyDetail from "./pages/CompanyDetail";
import CheckInComparison from "./pages/CheckInComparison";
import Home from "./pages/Home";
import { InvestmentProvider } from "./contexts/InvestmentContext";

function App() {
  return (
    <InvestmentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="my-comparison">
              <Route index element={<MyComparison />} />
              <Route path="check-id-comparison" element={<CheckInComparison />} />
            </Route>
            <Route path="comparison-status" element={<ComparisonStatus />} />
            <Route path="investment-status" element={<InvestmentStatus />} />
            <Route path="companies/:companyId" element={<CompanyDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </InvestmentProvider>
  );
}

export default App;
