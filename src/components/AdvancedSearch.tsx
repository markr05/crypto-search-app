import { useEffect, useState } from "react";

interface Props {
  BASE_URL?: string;
  endpoint?: string;
  coin: string;
  search: string;
  currency: string;
  symbol: string;
}

const CoinGeckoSearch = ({
  BASE_URL = "https://api.coingecko.com/api/v3/",
  coin,
  endpoint = `coins/${coin}`,
  search,
  currency,
  symbol,
}: Props) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cacheKey = `${coin}-${search}`;

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(cacheKey);

      if (coin === "") {
        setLoading(false);
        return;
      }

      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}${endpoint}`);

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(`${response.status} ${errorDetails.error}`);
        }

        const result = await response.json();
        setData(result);
        localStorage.setItem(cacheKey, JSON.stringify(result));
      } catch (err: any) {
        console.error("Fetch error:", err);

        setError(
          err.message || `An unexpected error occurred while fetching data.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL, endpoint, coin, search, currency]);

  if (loading) return <div className="results">Loading...</div>;
  if (error) return <div className="results">Error: {error}</div>;

  const value = data?.["market_data"]?.[search]?.[currency];
  const formattedValue = value ? value.toLocaleString() : "";

  return (
    <div>
      <div className="results">
        {symbol}
        {formattedValue}
      </div>
    </div>
  );
};

export default CoinGeckoSearch;
