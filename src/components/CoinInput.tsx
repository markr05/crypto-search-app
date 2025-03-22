import getCoinMap from "../utils/coinMap";

interface Props {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const CoinInput = ({ field, value, onChange }: Props) => {
  const coins = getCoinMap();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(field, e.target.value);
  };

  return (
    <div className="input-group mb-3 ml-5">
      <span className="input-group-text" id="basic-addon1">
        {field}
      </span>
      <input
        type="text"
        className="form-control focus:outline-none"
        aria-describedby="basic-addon1"
        list="datalistOptions"
        id="exampleDataList"
        value={value}
        onChange={handleChange}
      ></input>
      <datalist id="datalistOptions">
        {Object.values(coins).map((name, index) => (
          <option key={index} value={name}>
            {name}
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
