import CoinInput from "./components/CoinInput";
import Button from "./components/Button";
import Dropdown from "./components/Dropdown";
import CoinGeckoSearch from "./components/AdvancedSearch";
import TrendingSearch from "./components/TrendingSearch";
import MarketTrends from "./components/MarketTrends";
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
      <h1 className="title">CryptoSearch</h1>
      <h5 className="title">Powered by Coingecko API</h5>
      <MarketTrends />
      <div className="search-buttons">
        <Button onClick={handleButtonClick}>SEARCH</Button>
        <Button onClick={handleCompareClick}>COMPARE</Button>
      </div>
      <div className="container mt-2">
        {[0, ...(compare ? [1] : [])].map((index) => (
          <div
            className={`coin-wrapper ${index === 1 ? "fade-in" : ""}`}
            key={index}
          >
            <div className="coin-input">
              <CoinInput
                field={`Coin ${index + 1}`}
                value={coins[index].id}
                onChange={(_, value) => handleInputChange(index, "id", value)}
              />
              <div className="other-choices">
                <Dropdown
                  field={`Search Query ${index + 1}`}
                  value={coins[index].searchQuery}
                  onChange={(_, value) =>
                    handleInputChange(index, "searchQuery", value)
                  }
                  items={search_queries}
                />
                <Dropdown
                  field={`Currency Abr ${index + 1}`}
                  value={coins[index].currency}
                  onChange={(_, value) =>
                    handleInputChange(index, "currency", value)
                  }
                  items={currencies}
                />
              </div>
            </div>
            {coinResults && coins[index].id && (
              <div className="results">
                <CoinGeckoSearch
                  key={index}
                  coin={coins[index].coinID}
                  searchQuery={coins[index].searchQuery}
                  currency={coins[index].currency}
                  symbol={percentage ? "% " : coins[index].currencySymbol}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <TrendingSearch />
    </>
  );
}

export default App;
