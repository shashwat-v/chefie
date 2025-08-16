import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [meals, setMeals] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchFunction();

      setMeals(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occured!"));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMeals(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { meals, loading, error, refetch: fetchData, reset };
};

export default useFetch;
