import CoinInput from "./components/CoinInput";
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
    percentage,
    coins,
    handleInputChange,
    handleButtonClick,
    handleCompareClick,
  } = useCryptoSearch();

  return (
    <>
      <h1 className="title main-title">CryptoSearch</h1>
      <h5 className="title sub-title">Powered by Coingecko API</h5>
      <div className="container mt-2">
        {[0, ...(compare ? [1] : [])].map((index) => (
          <div className="coin-input" key={index}>
            <CoinInput
              field={`Coin ID ${index + 1}`}
              value={coins[index].id}
              onChange={(field, value) => handleInputChange(index, "id", value)}
            />
            <div className="other-choices">
              <Dropdown
                field={`Search Query ${index + 1}`}
                value={coins[index].searchQuery}
                onChange={(field, value) =>
                  handleInputChange(index, "searchQuery", value)
                }
                items={search_queries}
              />
              <Dropdown
                field={`Currency Abr ${index + 1}`}
                value={coins[index].currency}
                onChange={(field, value) =>
                  handleInputChange(index, "currency", value)
                }
                items={currencies}
              />
            </div>
          </div>
        ))}
        {coinResults &&
          coins.map((coin, index) =>
            coin.id ? (
              <div className="results" key={`result-${index}`}>
                {" "}
                <CoinGeckoSearch
                  key={index}
                  coin={coin.apiCoinId || coin.id}
                  search={coin.searchQuery}
                  currency={coin.currency.toLowerCase()}
                  symbol={percentage ? "% " : coin.currencySymbol}
                />{" "}
              </div>
            ) : null
          )}
        <div className="search-buttons">
          <Button onClick={handleButtonClick}>SEARCH</Button>
          <Button onClick={handleCompareClick}>COMPARE</Button>
        </div>
      </div>
    </>
  );
}

export default App;
