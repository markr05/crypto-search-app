import { useEffect, useState } from "react";

interface Props {
  BASE_URL?: string;
  endpoint?: string;
  coin: string;
  search: string;
  currency: string;
}

const CoinGeckoSearch = ({
  BASE_URL = "https://api.coingecko.com/api/v3/",
  coin,
  endpoint = `coins/${coin}`,
  search,
  currency,
}: Props) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cacheKey = `${coin}-${search}`;

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const response = await fetch(`${BASE_URL}${endpoint}`);

          if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(
              `Failed to fetch data ${response.status} ${errorDetails}`
            );
          }

          const result = await response.json();
          setData(result);

          localStorage.setItem(cacheKey, JSON.stringify(result));
        } catch (err) {
          setError("Failed to fetch data");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [BASE_URL, endpoint, coin, search, currency]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const value = data?.["market_data"]?.[search]?.[currency];
  const formattedValue = value ? value.toLocaleString() : "N/A";

  return (
    <div>
      <div className="results">${formattedValue}</div>
    </div>
  );
};

export default CoinGeckoSearch;
