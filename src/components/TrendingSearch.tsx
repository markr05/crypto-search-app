import { useEffect, useState, memo } from "react";

interface Coin {
  name: string;
  price: number;
  price_change_24h: number;
  small: string;
}
const BASE_URL = "https://api.coingecko.com/api/v3/";
const ENDPOINT = "search/trending";

const TrendingSearch = () => {
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
  if (error) return <div>Error {error}</div>;

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
      <div className="trending-wrapper first-scroll">
        <span className="trending-coins">
          {sortedTrendingCoins
            .filter((coin: Coin) => coin.price > 0.0001)
            .filter((coin: Coin) => Math.abs(coin.price_change_24h) > 4)
            .map((coin: Coin) => (
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
