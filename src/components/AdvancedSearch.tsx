import { useEffect, useState } from "react";

interface Props {
  BASE_URL?: string;
  endpoint?: string;
  coin: string;
  searchQuery: string;
  currency: string;
  symbol: string;
}

const CoinGeckoSearch = ({
  BASE_URL = "https://api.coingecko.com/api/v3/",
  coin,
  endpoint,
  searchQuery,
  currency,
  symbol,
}: Props) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!coin) {
      setError("No coin specified");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const finalEndpoint = endpoint || `coins/${coin}`;
        const response = await fetch(`${BASE_URL}${finalEndpoint}`);

        if (!response.ok) {
          const errorDetails = await response.json().catch(() => ({}));
          throw new Error(
            `${response.status} ${errorDetails.error || response.statusText}`
          );
        }

        const result = await response.json();
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
  }, [BASE_URL, coin, endpoint]);

  if (loading) return <div className="results">Loading...</div>;
  if (error) return <div className="results">Error: {error}</div>;

  let value;

  if (data?.market_data && data.market_data[searchQuery]) {
    value = data.market_data[searchQuery][currency];
  }

  if (value === undefined || value === null) {
    return (
      <div className="results">
        {symbol} N/A (Data not available for {searchQuery} in {currency})
      </div>
    );
  }

  const formattedValue =
    typeof value === "number"
      ? value < 0.001
        ? value.toExponential(6)
        : value.toLocaleString(undefined, { maximumFractionDigits: 8 })
      : value.toString();

  return (
    <div>
      <div className="results">
        {symbol} {formattedValue}
      </div>
    </div>
  );
};

export default CoinGeckoSearch;
