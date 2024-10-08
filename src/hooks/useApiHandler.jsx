import { useState, useCallback } from "react";

//한번에 쿼리 params랑 다 같이 관리
//useApiHandler(api 호출함수와, 초기 쿼리 파라미터 객체)
export function useApiHandler(apiCallFunction, INITIAL_QUERY_PARAMS) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [list, setList] = useState([]);
  const [queryParams, setQueryParams] = useState(INITIAL_QUERY_PARAMS);
  const [totalPages, setTotalPages] = useState(0);

  const handleQueryParamsChange = useCallback((name, value) => {
    setQueryParams((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }, []);

  const init = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiCallFunction(queryParams);
      const { list, totalCount } = data;
      setList(list);
      setTotalPages(Math.ceil(totalCount / queryParams.limit));
    } catch (err) {
      console.error(err.message);
      setError(err);
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  }, [apiCallFunction, queryParams]);

  return {
    loading,
    error,
    init,
    list,
    queryParams,
    handleQueryParamsChange,
    totalPages,
  };
}
