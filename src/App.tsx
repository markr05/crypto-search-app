import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import CoinGeckoData from "./components/index";
import CoinGeckoSearch from "./components/AdvancedSearch";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const [coinResults, setCoinResults] = useState(false);
  const [currentValues, setCurrentValues] = useState<{ [key: string]: string }>(
    {
      "Coin ID": "",
      "Search Query": "",
      "Currency Abr": "usd",
    }
  );

  const [values, setValues] = useState<{ [key: string]: string }>({
    "Coin ID": "",
    "Search Query": "",
    "Currency Abr": "usd",
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
      <Input
        field="Coin ID"
        value={currentValues["Coin ID"]}
        onChange={handleInputChange}
      />
      <Input
        field="Search Query"
        value={currentValues["Search Query"]}
        onChange={handleInputChange}
      />
      <Dropdown
        field="Currency Abr"
        value={currentValues["Currency Abr"]}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>SEARCH</Button>
      {coinResults && <CoinGeckoSearch coin={values["Coin ID"]} />}
    </div>
  );
}

export default App;
