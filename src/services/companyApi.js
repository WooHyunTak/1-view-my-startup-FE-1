import axios from "axios";
const API_URL = process.env.REACT_APP_LOCAL_API_URL;

const splitSortOption = (value) => {
  const splits = value.split("_");
  const [sortBy, order] = splits;
  return { sortBy, order };
};

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
});

export async function getCompanies({
  limit = 10,
  orderBy = "revenue_desc",
  keyword = "",
  nextCursor,
}) {
  const { sortBy, order } = splitSortOption(orderBy);
  try {
    const res = await instance.get("/api/companies", {
      params: { nextCursor, limit, sortBy, order, keyword },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getInvestmentStatus({
  limit = 10,
  orderBy = "virtualInvestment_desc",
  nextCursor,
}) {
  const { sortBy, order } = splitSortOption(orderBy);
  try {
    const res = await instance.get("/api/companies/investments/status", {
      params: { nextCursor, limit, sortBy, order },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getSelectionStatus({
  limit = 10,
  orderBy = "selectedCount_desc",
  nextCursor,
}) {
  const { sortBy, order } = splitSortOption(orderBy);
  try {
    const res = await instance.get("/api/comparisons/selections", {
      params: { nextCursor, limit, sortBy, order },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
