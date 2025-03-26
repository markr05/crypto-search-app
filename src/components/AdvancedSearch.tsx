import { useEffect, useState } from "react";
import { search_queries } from "../constants";
import { getCoinIdNameMap } from "../services/coingeckoService";

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
  const [percentage, setPercentage] = useState(false);
  const coins = getCoinIdNameMap();

  useEffect(() => {
    if (!coin) {
      setError("No coin specified");
      setLoading(false);
      return;
    }

    setPercentage(searchQuery.toLowerCase().includes("change"));

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

  if (loading) return <div>Loading...</div>;
  if (error) {
    if (error.includes("Network")) {
      return <div>Search limit reached. Please wait.</div>;
    } else {
      return <div>Error: {error}</div>;
    }
  }

  let value;

  if (data?.market_data && data.market_data[searchQuery]) {
    value = data.market_data[searchQuery][currency.toLowerCase()];
  }

  if (value === undefined || value === null) {
    return <div>{symbol} N/A (Data not available)</div>;
  }

  const formattedValue =
    value < 1
      ? value < 0.001
        ? value.toLocaleString(undefined, { maximumFractionDigits: 6 })
        : value.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : value.toLocaleString(undefined, { maximumFractionDigits: 5 });
  return (
    <div>
      {percentage ? (
        <div>
          <div>
            <img className="thumbnail" src={data.image.small} /> {coins[coin]}
          </div>
          {search_queries[searchQuery]}:
          <div className="result-number">
            {formattedValue}
            {symbol}
          </div>
        </div>
      ) : (
        <div>
          <div>
            <img className="thumbnail" src={data.image.small} /> {coins[coin]}
          </div>
          {search_queries[searchQuery]}:
          <div className="result-number">
            {symbol}
            {formattedValue}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinGeckoSearch;
