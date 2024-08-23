import { useState, useCallback } from "react";

export function useAsync(apiCallFunction) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        return await apiCallFunction(...args);
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
    },
    [apiCallFunction]
  );
  return { loading, error, fetchData };
}
