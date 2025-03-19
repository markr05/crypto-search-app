import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import CoinGeckoSearch from "./components/AdvancedSearch";
import { CoinDataComponent } from "./services/coingeckoService";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const coins = CoinDataComponent();
  const coinMap: { [key: string]: string } = {};
  coins.forEach((coin) => {
    coinMap[coin.name.toLowerCase()] = coin.id;
  });

  const [coinResults, setCoinResults] = useState(false);
  const [compare, setCompare] = useState(false);
  const currencies: { [key: string]: string } = {
    usd: "United States Dollar",
    eur: "Euro",
    cad: "Canadian Dollar",
    gbp: "British Pound",
    jpy: "Japanese Yen",
    aud: "Australian Dollar",
    chf: "Swiss Franc",
    cny: "Chinese Yuan",
    sek: "Swedish Krona",
    nzd: "New Zealand Dollar",
  };

  const search_queries: { [key: string]: string } = {
    current_price: "Current Price",
    market_cap: "Market Capital",
    ath: "All Time High",
    high_24: "Highest Value in Past Day",
    low_24: "Lowest Value in Past Day",
    price_change_percentage_1h_in_currency: "Price Change in 1 Hour",
    price_change_percentage_24h_in_currency: "Price Change in 24 Hours",
    price_change_percentage_7d_in_currency: "Price Change in 7 Days",
    price_change_percentage_14d_in_currency: "Price Change in 14 Days",
    price_change_percentage_30d_in_currency: "Price Change in 30 Days",
    price_change_percentage_60d_in_currency: "Price Change in 60 Days",
    price_change_percentage_200d_in_currency: "Price Change in 200 Days",
    price_change_percentage_1y_in_currency: "Price Change in 1 year",
  };

  const [currentValues, setCurrentValues] = useState<{ [key: string]: string }>(
    {
      "Coin ID": "",
      "Search Query": "",
      "Currency Abr": "",
      "Coin ID 2": "",
      "Search Query 2": "",
      "Currency Abr 2": "",
    }
  );

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

  return (
    <>
      <h1 className="title main-title">CryptoSearch</h1>
      <h5 className="title sub-title">Powered by Coingecko API</h5>
      <div className="container mt-2">
        <div>
          <Input
            field="Coin ID"
            value={currentValues["Coin ID"]}
            onChange={handleInputChange}
          />
          <div className="other-choices">
            <div>
              <Dropdown
                field="Search Query"
                value={currentValues["Search Query"]}
                onChange={handleInputChange}
                items={search_queries}
              />
            </div>
            <div>
              <Dropdown
                field="Currency Abr"
                value={currentValues["Currency Abr"]}
                onChange={handleInputChange}
                items={currencies}
              />
            </div>
          </div>
          <div className="search-buttons">
            <Button onClick={handleButtonClick}>SEARCH</Button>
            <Button onClick={handleCompareClick}>COMPARE</Button>
          </div>
        </div>
        <div>
          {compare && (
            <div>
              <Input
                field="Coin ID 2"
                value={currentValues["Coin ID 2"]}
                onChange={handleInputChange}
              />
              <div className="other-choices">
                <div>
                  <Dropdown
                    field="Search Query 2"
                    value={currentValues["Search Query 2"]}
                    onChange={handleInputChange}
                    items={search_queries}
                  />
                </div>
                <div>
                  <Dropdown
                    field="Currency Abr 2"
                    value={currentValues["Currency Abr 2"]}
                    onChange={handleInputChange}
                    items={currencies}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {coinResults && (
          <CoinGeckoSearch
            coin={values["Coin ID"]}
            search={values["Search Query"]}
            currency={values["Currency Abr"]}
          />
        )}
        {coinResults && (
          <CoinGeckoSearch
            coin={values["Coin ID 2"]}
            search={values["Search Query 2"]}
            currency={values["Currency Abr 2"]}
          />
        )}
      </div>
    </>
  );
}

export default App;
