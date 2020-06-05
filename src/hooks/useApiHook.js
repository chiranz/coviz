import APIService from "../api";
import { useState, useEffect } from "react";

export const useAPI = (method, ...params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        setLoading(true);
        setData(await APIService[method](params));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [method, params]);

  return [data, loading, error];
};
