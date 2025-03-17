import { useEffect, useState } from "react";

interface Props {
  BASE_URL?: string;
  endpoint?: string;
  coin: string;
}

const CoinGeckoSearch = ({
  BASE_URL = "https://api.coingecko.com/api/v3/",
  coin,
  endpoint = `coins/${coin}`,
}: Props) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
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
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="results">
        ${JSON.stringify(data["market_data"]["current_price"]["usd"], null, 2)}
      </div>
    </div>
  );
};

export default CoinGeckoSearch;
