import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import MyComparison from "./pages/MyComparison";
import ComparisonStatus from "./pages/ComparisonStatus";
import InvestmentStatus from "./pages/InvestmentStatus";
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
