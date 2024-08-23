import { createContext, useState } from "react";
import { deleteInvestment, createInvestment } from "../services/investmentApi";

// InvestmentContext 생성
export const InvestmentContext = createContext();

export function InvestmentProvider({ children }) {
  const [investments, setInvestments] = useState([]);

  const loadInvestments = (newInvestments) => {
    setInvestments(newInvestments);
  };

  const addInvestment = async (investmentData) => {
    try {
      const newInvestment = await createInvestment(investmentData);
      setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
    } catch (error) {
      console.error("Failed to create investment:", error);
    }
  };

  const deleteInvestmentById = async ({ id, password }) => {
    try {
      await deleteInvestment({ id, password });
      setInvestments((prevInvestments) => prevInvestments.filter((investment) => investment.id !== id));
      console.log(`Investment with id: ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete investment:", error);
    }
  };

  return (
    <InvestmentContext.Provider value={{ investments, loadInvestments, deleteInvestmentById, addInvestment }}>
      {children}
    </InvestmentContext.Provider>
  );
}
