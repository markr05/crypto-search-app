import { useState, useEffect } from "react";
import { search_queries } from "../constants";
import { apiSearch } from "../services/apiSearch";

interface SearchComponents {
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
}: SearchComponents) => {
  const [percentage, setPercentage] = useState(false);
  const finalEndpoint = endpoint || `coins/${coin}`;

  const { data, loading, error } = apiSearch({
    baseUrl: BASE_URL,
    endpoint: finalEndpoint,
  });

  useEffect(() => {
    setPercentage(searchQuery.toLowerCase().includes("change"));
  }, [searchQuery]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    if (error.includes("Network" || "429")) {
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
      <div>
        <div>
          <img className="thumbnail" src={data.image.small} />
        </div>
        {search_queries[searchQuery]}:
        <div className="result-number">
          {percentage ? (
            <>
              {formattedValue}
              {symbol}
            </>
          ) : (
            <>
              {symbol}
              {formattedValue}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinGeckoSearch;
