import { memo } from "react";
import { apiSearch } from "../services/apiSearch";

const BASE_URL = "https://api.coingecko.com/api/v3/";
const ENDPOINT = "global";

interface GlobalData {
  total_market_cap: {
    usd: number;
    [key: string]: number;
  };
  market_cap_change_percentage_24h_usd: number;
  [key: string]: any;
}

const MarketTrends = () => {
  const { data, loading, error } = apiSearch({
    baseUrl: BASE_URL,
    endpoint: ENDPOINT,
  });

  if (loading) return <div></div>;
  if (error) return <div></div>;

  const { total_market_cap, market_cap_change_percentage_24h_usd } =
    data?.data as GlobalData;

  return (
    <div>
      <span className="market-trend">
        <div className="result-number">
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
