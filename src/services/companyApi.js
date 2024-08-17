import axios from "axios";
const API_URL = process.env.REACT_APP_LOCAL_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: { "Content-type": "application/json" },
});

export async function getCompanies({
  limit = 10,
  orderBy = "highestRevenue",
  keyword = "",
  nextCursor = null,
}) {
  try {
    const res = await instance.get("/api/companies", {
      params: { nextCursor, limit, orderBy, keyword },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
