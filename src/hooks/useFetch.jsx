import { useEffect, useState } from "react";

// const DEFAULT_HERDERS = {
//   accept: "application/json",
//   Authorization: `Bearer ${import.meta.env.VITE_API_TOCKEN}`,
// };
export default function useFetch(
  { url = "", method = "GET", headers = {} },
  { enabled } = { enabled: true }
) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (enabled) {
      setIsLoading(true);
      fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
        method,
        headers: {
          // ...DEFAULT_HERDERS,
          ...headers,
        },
      })
        .then(async (res) => {
          const data = await res.json();
          setData(data);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers), enabled]);
  return { isLoading, data };
}
