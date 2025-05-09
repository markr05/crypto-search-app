import { useState, useEffect } from "react";
import { getCurrencySymbol } from "../utils/currencySymbol";
import { getCoinNameIdMap } from "../services/coingeckoService";

export function useCryptoSearch() {
  const nameToIdMap = getCoinNameIdMap();
  const [coinResults, setCoinResults] = useState(false);
  const [compare, setCompare] = useState(false);
  const [percentage, setPercentage] = useState(false);
  const [coins, setCoins] = useState([
    { id: "", searchQuery: "", currency: "", currencySymbol: "", coinID: "" },
    { id: "", searchQuery: "", currency: "", currencySymbol: "", coinID: "" },
  ]);

  const handleInputChange = (index: number, field: keyof (typeof coins)[0], value: string) => {
    setCoins((prevCoins) => {
      const updatedCoins = [...prevCoins];
      updatedCoins[index] = { ...updatedCoins[index], [field]: value };
      
      if (field === "id" && value) {
        const coinID = nameToIdMap[value];
        if (coinID) {
          updatedCoins[index].coinID = coinID;
        }
      }
      
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
        const coinID = nameToIdMap[coin.id]
        return {
          ...coin,
          currencySymbol: symbol || "",
          coinID: coinID || ""
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