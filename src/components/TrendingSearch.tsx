import { memo } from "react";
import { apiSearch } from "../services/apiSearch";

interface CoinData {
  name: string;
  price: number;
  price_change_24h: number;
  small: string;
}
const BASE_URL = "https://api.coingecko.com/api/v3/";
const ENDPOINT = "search/trending";

const TrendingSearch = () => {
  const { data, loading, error } = apiSearch({
    baseUrl: BASE_URL,
    endpoint: ENDPOINT,
  });

  if (loading) return <div></div>;
  if (error) return <div></div>;

  const trendingCoinsList = data.coins.map(
    (coin: {
      item: {
        name: any;
        data: { price: any; price_change_percentage_24h: any };
        small: any;
      };
    }) => ({
      name: coin.item.name,
      price: coin.item.data.price,
      price_change_24h: coin.item.data.price_change_percentage_24h.usd,
      small: coin.item.small,
    })
  );

  const sortedTrendingCoins = trendingCoinsList.sort(
    (a: any, b: any) =>
      Math.abs(b.price_change_24h) - Math.abs(a.price_change_24h)
  );

  return (
    <div>
      <div className="trending-wrapper">
        <span className="trending-coins">
          {sortedTrendingCoins
            .filter((coin: CoinData) => coin.price > 0.0001)
            .filter((coin: CoinData) => Math.abs(coin.price_change_24h) > 4)
            .slice(0, 8)
            .map((coin: CoinData) => (
              <div className="coin" key={coin.name}>
                <div className="trending-title">{coin.name}</div>
                <img className="thumbnail" src={coin.small} />
                <div className="price">{`$${
                  coin.price < 10
                    ? coin.price.toFixed(3)
                    : coin.price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                }`}</div>
                <div
                  className={
                    coin.price_change_24h > 0
                      ? "change positive"
                      : "change negative"
                  }
                >
                  {coin.price_change_24h > 0
                    ? ` +${coin.price_change_24h.toFixed(3)}%`
                    : ` ${coin.price_change_24h.toFixed(3)}%`}
                </div>
              </div>
            ))}
        </span>
      </div>
    </div>
  );
};

export default memo(TrendingSearch);
