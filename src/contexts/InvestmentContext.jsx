import { createContext, useCallback, useState, useRef } from "react";
import { deleteInvestment, createInvestment, updateInvestment } from "../services/investmentApi";

// InvestmentContext 생성
export const InvestmentContext = createContext();

export function InvestmentProvider({ children }) {
  const [investments, setInvestments] = useState([]);
  const [version, setVersion] = useState(0);
  const previousInvestments = useRef([]); // 이전 상태 저장

  const updateVersionIfNeeded = (newInvestments) => {
    if (JSON.stringify(previousInvestments.current) !== JSON.stringify(newInvestments)) {
      setVersion((prevVersion) => prevVersion + 1);
      previousInvestments.current = newInvestments;
    }
  };

  const loadInvestments = useCallback((newInvestments) => {
    setInvestments(newInvestments);
    updateVersionIfNeeded(newInvestments); // 조건부로 version 업데이트
  }, []);

  const addInvestment = async (investmentData) => {
    try {
      const newInvestment = await createInvestment(investmentData);
      const updatedInvestments = [...investments, newInvestment];
      setInvestments(updatedInvestments);
      updateVersionIfNeeded(updatedInvestments); // 조건부로 version 업데이트
    } catch (error) {
      console.error("Failed to create investment:", error);
    }
  };

  const updateInvestmentById = async ({ id, updatedData }) => {
    try {
      const updatedInvestment = await updateInvestment({ id, updatedData });
      const updatedInvestments = investments.map((investment) =>
        investment.id === id ? updatedInvestment : investment
      );
      setInvestments(updatedInvestments);
      updateVersionIfNeeded(updatedInvestments); // 조건부로 version 업데이트
    } catch (error) {
      console.error("Failed to update investment:", error);
    }
  };

  const deleteInvestmentById = async ({ id, password }) => {
    try {
      await deleteInvestment({ id, password });
      const updatedInvestments = investments.filter((investment) => investment.id !== id);
      setInvestments(updatedInvestments);
      updateVersionIfNeeded(updatedInvestments); // 조건부로 version 업데이트
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
