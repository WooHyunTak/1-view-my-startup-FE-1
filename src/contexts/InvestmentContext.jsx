import { createContext, useCallback, useState } from "react";
import { deleteInvestment, createInvestment, updateInvestment } from "../services/investmentApi";

// InvestmentContext 생성
export const InvestmentContext = createContext();

export function InvestmentProvider({ children }) {
  const [investments, setInvestments] = useState([]);
  const [version, setVersion] = useState(0);

  const loadInvestments = useCallback((newInvestments) => {
    setInvestments(newInvestments);
    setVersion((preVersion) => preVersion + 1);
  }, []);

  const addInvestment = async (investmentData) => {
    try {
      const newInvestment = await createInvestment(investmentData);
      setInvestments((prevInvestments) => [...prevInvestments, newInvestment]);
      setVersion((preVersion) => preVersion + 1);
    } catch (error) {
      console.error("Failed to create investment:", error);
    }
  };

  const updateInvestmentById = async ({ id, updatedData }) => {
    try {
      const updatedInvestment = await updateInvestment({ id, updatedData });
      setInvestments((prevInvestments) =>
        prevInvestments.map((investment) => (investment.id === id ? updatedInvestment : investment))
      );
      setVersion((preVersion) => preVersion + 1);
    } catch (error) {
      console.error("Failed to update investment:", error);
    }
  };

  const deleteInvestmentById = async ({ id, password }) => {
    try {
      await deleteInvestment({ id, password });
      setInvestments((prevInvestments) => prevInvestments.filter((investment) => investment.id !== id));
      setVersion((preVersion) => preVersion + 1);
    } catch (error) {
      console.error("Failed to delete investment:", error);
    }
  };

  return (
    <InvestmentContext.Provider
      value={{
        investments,
        loadInvestments,
        updateInvestmentById,
        deleteInvestmentById,
        addInvestment,
        version,
        setVersion,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
}
