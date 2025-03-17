import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

export const CoinDataComponent = () => {
  const [coinData, setCoinData] = useState<Coin[]>([]);

  useEffect(() => {
    const cachedData = localStorage.getItem("coinData");

    if (cachedData) {
      setCoinData(JSON.parse(cachedData));
    } else {
      const fetchCoinData = async () => {
        try {
          const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/list"
          );
          const data: Coin[] = await response.json();
          setCoinData(data);
          localStorage.setItem("coinData", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to fetch coin data:", error);
        }
      };

      fetchCoinData();
    }
  }, []);

  return coinData;
};
