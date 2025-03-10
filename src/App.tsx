import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import CoinGeckoData from "./components/index";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const [coinResults, setCoinResults] = useState(false);
  const [currentValues, setCurrentValues] = useState<{ [key: string]: string }>(
    {
      "Coin ID": "",
      "Job Location": "",
      "Currency Abr": "usd",
    }
  );

  const [values, setValues] = useState<{ [key: string]: string }>({
    "Coin ID": "",
    "Job Location": "",
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
      "Job Location": currentValues["Job Location"].toLowerCase(),
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
        options={["Bitcoin", "Ethereum", "Litecoin", "Dogecoin", "Solana"]}
      />
      <Input
        field="Job Location"
        value={currentValues["Job Location"]}
        onChange={handleInputChange}
        options={["Bitcoin", "Ethereum", "Litecoin", "Dogecoin", "Solana"]}
      />
      <Dropdown
        field="Currency Abr"
        value={currentValues["Currency Abr"]}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>SEARCH</Button>
      {coinResults && <CoinGeckoData coin={values["Coin ID"]} />}
    </div>
  );
}

export default App;
