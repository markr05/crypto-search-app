import { useEffect, useState, memo } from "react";

const BASE_URL = "https://api.coingecko.com/api/v3/";
const ENDPOINT = "global";

const MarketTrends = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}${ENDPOINT}`);

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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const { total_market_cap, market_cap_change_percentage_24h_usd } =
    data?.data || {};

  return (
    <div>
      <span className="market-trend">
        <div>
          $
          {total_market_cap.usd.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </div>
        <div className="market-cap">Market Cap</div>
        <div
          className={
            market_cap_change_percentage_24h_usd > 0
              ? "market-percent positive"
              : "market-percent negative"
          }
        >
          {market_cap_change_percentage_24h_usd > 0 ? "+" : ""}
          {market_cap_change_percentage_24h_usd.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          %
        </div>
      </span>
    </div>
  );
};

export default memo(MarketTrends);
