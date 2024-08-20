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
  page = 1,
}) {
  const { sortBy, order } = splitSortOption(orderBy);
  try {
    const res = await instance.get("/api/companies", {
      params: { page, limit, sortBy, order, keyword },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getCompany(id) {
  try {
    const res = await instance.get(`/api/companies/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getInvestmentStatus({
  limit = 10,
  orderBy = "virtualInvestment_desc",
  page = 1,
}) {
  const { sortBy, order } = splitSortOption(orderBy);
  try {
    const res = await instance.get("/api/companies/investments/status", {
      params: { page, limit, sortBy, order },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getComparisonStatus({
  limit = 10,
  orderBy = "selectedCount_desc",
  page = 1,
}) {
  const { sortBy, order } = splitSortOption(orderBy);
  try {
    const res = await instance.get("/api/comparisons/status", {
      params: { page, limit, sortBy, order },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
