import Input from "./components/Input";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import CoinGeckoSearch from "./components/AdvancedSearch";
import { currencies, search_queries } from "./constants";
import { useCryptoSearch } from "./hooks/useCryptoSearch";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const {
    coinResults,
    compare,
    currentValues,
    values,
    handleInputChange,
    handleButtonClick,
    handleCompareClick,
  } = useCryptoSearch();

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
            <Dropdown
              field="Search Query"
              value={currentValues["Search Query"]}
              onChange={handleInputChange}
              items={search_queries}
            />
            <Dropdown
              field="Currency Abr"
              value={currentValues["Currency Abr"]}
              onChange={handleInputChange}
              items={currencies}
            />
          </div>
          <div className="search-buttons">
            <Button onClick={handleButtonClick}>SEARCH</Button>
            <Button onClick={handleCompareClick}>COMPARE</Button>
          </div>
        </div>
        {compare && (
          <div>
            <Input
              field="Coin ID 2"
              value={currentValues["Coin ID 2"]}
              onChange={handleInputChange}
            />
            <div className="other-choices">
              <Dropdown
                field="Search Query 2"
                value={currentValues["Search Query 2"]}
                onChange={handleInputChange}
                items={search_queries}
              />
              <Dropdown
                field="Currency Abr 2"
                value={currentValues["Currency Abr 2"]}
                onChange={handleInputChange}
                items={currencies}
              />
            </div>
          </div>
        )}
        {coinResults && (
          <>
            <CoinGeckoSearch
              coin={values["Coin ID"]}
              search={values["Search Query"]}
              currency={values["Currency Abr"]}
            />
            <CoinGeckoSearch
              coin={values["Coin ID 2"]}
              search={values["Search Query 2"]}
              currency={values["Currency Abr 2"]}
            />
          </>
        )}
      </div>
    </>
  );
}

export default App;
