import { useState, useEffect } from "react";
import getCoinMap from "../utils/coinMap";
import { getCurrencySymbol } from "../utils/currencySymbol";

export function useCryptoSearch() {
  const coinMap = getCoinMap();
  const [coinResults, setCoinResults] = useState(false);
  const [compare, setCompare] = useState(false);
  const [percentage, setPercentage] = useState(false);
  const [coins, setCoins] = useState([
    { id: "", searchQuery: "", currency: "", currencySymbol: "", apiCoinId: "" },
    { id: "", searchQuery: "", currency: "", currencySymbol: "", apiCoinId: "" },
  ]);

  const handleInputChange = (index: number, field: keyof (typeof coins)[0], value: string) => {
    setCoins((prevCoins) => {
      const updatedCoins = [...prevCoins];
      updatedCoins[index] = { ...updatedCoins[index], [field]: value };
      return updatedCoins;
    });
    setCoinResults(false);
  };

  useEffect(() => {
    setPercentage(coins[0].searchQuery.toLowerCase().includes("change"));
  }, [coins[0].searchQuery]);

  const handleButtonClick = () => {
    if (coins[0].id === "" || coins[0].searchQuery === "" || coins[0].currency === "") {
      setCoinResults(false);
      return;
    }

    setCoins((prevCoins) => 
      prevCoins.map((coin) => {
        const symbol = getCurrencySymbol(coin.currency);
        const mappedCoinId = coin.id ? coinMap[coin.id.toLowerCase()] || coin.id : "";
        
        return {
          ...coin,
          currencySymbol: symbol || "",
          apiCoinId: mappedCoinId
        };
      })
    );
    
    setCoinResults(true);
  };

  const handleCompareClick = () => {
    setCompare((prev) => !prev);
  };

  return {
    coinResults,
    compare,
    percentage,
    coins,
    handleInputChange,
    handleButtonClick,
    handleCompareClick,
  };
}