import axios from "axios";
const API_URL = process.env.REACT_APP_LOCAL_API_URL;

const splitSortOption = (value) => {
  const splits = value.split("_");
  const [sortBy, order] = splits;
  return { sortBy, order };
};

const instance = axios.create({
  baseURL: API_URL,
});

export async function getComparison(params = {}, item = {}) {
  const { orderBy } = params;
  const { sortBy, order } = splitSortOption(orderBy);
  const res = await instance.post("/api/comparisons", item, {
    params: { sortBy, order },
  });
  return res.data;
}

export async function getComparisonRank(params = {}, item) {
  const { orderBy } = params;
  const { sortBy, order } = splitSortOption(orderBy);
  const res = await instance.get(`/api/comparisons/rank/${item.id}`, {
    params: { sortBy, order },
  });

  return res.data;
}

export async function patchCounts(params = {}) {
  const { myCompany, comparisonIds } = params;
  const res = await instance.patch(`/api/comparisons/comparison-counts`, {
    myCompanyId: myCompany.id,
    comparisonIds,
  });

  return res;
}
