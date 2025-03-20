import { CoinDataComponent } from "../services/coingeckoService"

const getCoinMap = () => {
  const coins = CoinDataComponent();
  const coinMap: { [key: string]: string } = {};
  coins.forEach((coin) => {
    coinMap[coin.name.toLowerCase()] = coin.id;
  });
  return coinMap;
}

export default getCoinMap;