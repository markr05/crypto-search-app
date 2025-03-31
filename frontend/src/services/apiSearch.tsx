import { useEffect, useState } from "react";

interface ApiResponse {
  data?: any;
  [key: string]: any;
}

interface UseApiFetchProps {
  baseUrl: string;
  endpoint: string;
}

interface UseApiFetchResult {
  data: any;
  loading: boolean;
  error: string | null;
}

export const apiSearch = ({
  baseUrl,
  endpoint,
}: UseApiFetchProps): UseApiFetchResult => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
          const errorDetails = await response.json().catch(() => ({}));
          throw new Error(
            `${response.status} ${errorDetails.error || response.statusText}`
          );
        }
        const result: ApiResponse = await response.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        setError(
          err.message || `An unexpected error occurred while fetching data.`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [baseUrl, endpoint]);
  return { data: data || {}, loading, error };
};
