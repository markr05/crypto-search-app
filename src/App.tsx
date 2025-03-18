import { useState } from "react";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import CoinGeckoData from "./components/index";
import CoinGeckoSearch from "./components/AdvancedSearch";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const [coinResults, setCoinResults] = useState(false);
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
    }
  );

  const [values, setValues] = useState<{ [key: string]: string }>({
    "Coin ID": "",
    "Search Query": "",
    "Currency Abr": "",
  });

  const handleInputChange = (field: string, value: string) => {
    setCurrentValues((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));

    setCoinResults(false);
  };

  const handleButtonClick = () => {
    setValues({
      "Coin ID": currentValues["Coin ID"].toLowerCase(),
      "Search Query": currentValues["Search Query"].toLowerCase(),
      "Currency Abr": currentValues["Currency Abr"].toLowerCase(),
    });
    setCoinResults(true);
  };

  return (
    <div className="container mt-2">
      <h1>Crypto Searcher</h1>
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
      <Button onClick={handleButtonClick}>SEARCH</Button>
      {coinResults && (
        <CoinGeckoSearch
          coin={values["Coin ID"]}
          search={values["Search Query"]}
          currency={values["Currency Abr"]}
        />
      )}
    </div>
  );
}

export default App;
