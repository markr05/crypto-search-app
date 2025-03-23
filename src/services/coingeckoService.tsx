import { useEffect, useState } from "react";
import coinData from "../data/coins.json";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

export const CoinDataComponent = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const coinArray: Coin[] = Object.values(coinData);
    setCoins(coinArray);
  }, []);

  return coins;
};

export const getCoinIdNameMap = () => {
  const idToNameMap: { [id: string]: string } = {};

  Object.values(coinData).forEach((coin: any) => {
    idToNameMap[coin.id] = coin.name;
  });

  return idToNameMap;
};

export const getCoinNameIdMap = () => {
  const nameToIdMap: { [name: string]: string } = {};

  Object.values(coinData).forEach((coin: any) => {
    nameToIdMap[coin.name] = coin.id;
  });
  return nameToIdMap;
};
