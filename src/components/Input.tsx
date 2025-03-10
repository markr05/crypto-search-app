interface Props {
  field: string;
  value: string;
  options: string[];
  onChange: (field: string, value: string) => void;
}

const Input = ({ field, value, options, onChange }: Props) => {
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
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    </div>
  );
};

Input.defaultProps = {
  value: "",
};

export default Input;
