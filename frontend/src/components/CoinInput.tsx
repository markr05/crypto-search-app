import { getCoinIdNameMap } from "../services/coingeckoService";

interface InputProps {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const CoinInput = ({ field, value, onChange }: InputProps) => {
  const coins = getCoinIdNameMap();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="input-group mb-3 ml-5">
      <span className="input-group-text">{field}</span>
      <input
        type="text"
        className="form-control focus:outline-none"
        list="datalistOptions"
        value={value}
        onChange={handleChange}
        placeholder="Search"
      ></input>
      <datalist id="datalistOptions">
        {Object.keys(coins).map((name, index) => (
          <option key={index} value={coins[name]}>
            {coins[name]}
          </option>
        ))}
      </datalist>
    </div>
  );
};

CoinInput.defaultProps = {
  value: "",
};

export default CoinInput;
