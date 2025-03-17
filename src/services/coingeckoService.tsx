import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

export const useCoinList = (): Coin[] => {
  const [coinList, setCoinList] = useState<Coin[]>([]);
  useEffect(() => {
    const fetchCoinList = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        if (!response.ok) throw new Error("Failed to fetch coin list");
        const data: Coin[] = await response.json();
        setCoinList(data);
      } catch (error) {
        console.error(error);
        setCoinList([]);
      }
    };

    fetchCoinList();
  }, []);

  return coinList;
};
