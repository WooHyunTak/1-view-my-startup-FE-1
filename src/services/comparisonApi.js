import axios from "axios";
const API_URL = process.env.REACT_APP_LOCAL_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

export async function getComparison(params = {}, item) {
  const res = await instance.get("/api/comparisons", {
    params,
    headers: {
      ...item,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}

export async function getComparisonRank(params = {}, id) {
  const res = await instance.get("/api/comparisons", {
    params: {
      ...params,
      id,
    },
  });

  return res.data;
}
