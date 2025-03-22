import { CoinDataComponent } from "../services/coingeckoService"

const getCoinMap = () => {
  const coins = CoinDataComponent();
  const coinMap: { [key: string]: string } = {};
  coins.forEach((coin) => {
    coinMap[coin.id] = coin.name;
  });
  return coinMap;
}

export default getCoinMap;