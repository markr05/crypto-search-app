import { useState, useEffect } from "react";
import getCoinMap from "../utils/coinMap";

export function useCryptoSearch() {
  const coinMap = getCoinMap();

  const [coinResults, setCoinResults] = useState(false);
  const [compare, setCompare] = useState(false);
  const [percentage, setPercentage] = useState(false);
  
  const [currentValues, setCurrentValues] = useState<{ [key: string]: string }>({
    "Coin ID": "",
    "Search Query": "",
    "Currency Abr": "",
    "Coin ID 2": "",
    "Search Query 2": "",
    "Currency Abr 2": "",
  });

  const [values, setValues] = useState<{ [key: string]: string }>({
    "Coin ID": "",
    "Search Query": "",
    "Currency Abr": "",
    "Coin ID 2": "",
    "Search Query 2": "",
    "Currency Abr 2": "",
  });

  const handleInputChange = (field: string, value: string) => {
    setCurrentValues((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));

    setCoinResults(false);
  };

  useEffect(() => {
    setPercentage(currentValues["Search Query"].toLowerCase().includes("change"));
  }, [currentValues["Search Query"]]);

  const handleButtonClick = () => {
    if (
      currentValues["Coin ID"] === "" ||
      currentValues["Search Query"] === "" ||
      currentValues["Currency Abr"] === ""
    ) {
      setCoinResults(false);
      return;
    }

    setValues({
      "Coin ID": currentValues["Coin ID"]
        ? coinMap[currentValues["Coin ID"].toLowerCase()]
        : "",
      "Search Query": currentValues["Search Query"].toLowerCase(),
      "Currency Abr": currentValues["Currency Abr"].toLowerCase(),
      "Coin ID 2": currentValues["Coin ID 2"]
        ? coinMap[currentValues["Coin ID 2"].toLowerCase()]
        : "",
      "Search Query 2": currentValues["Search Query 2"].toLowerCase(),
      "Currency Abr 2": currentValues["Currency Abr 2"].toLowerCase(),
    });

    setCoinResults(true);
  };

  const handleCompareClick = () => {
    setCompare((prev) => !prev);
  };

  return {
    coinResults,
    compare,
    percentage,
    currentValues,
    values,
    handleInputChange,
    handleButtonClick,
    handleCompareClick,
  };
}
