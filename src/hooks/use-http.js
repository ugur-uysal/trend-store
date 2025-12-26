import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequest = useCallback(async function (requestConfig, applyData) {
    setIsLoading(true);
    setError(null);

    const { url, method, body, headers } = requestConfig;
    try {
      const response = await fetch(url, {
        method: method ?? "GET",
        body: JSON.stringify(body) ?? null,
        headers: headers ?? {},
      });
      if (response.status !== 200) throw new Error("Something went wrong!");

      const data = await response.json();

      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
