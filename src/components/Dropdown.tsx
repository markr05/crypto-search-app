interface Props {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
}

const Dropdown = ({ field, value, onChange }: Props) => {
  const onItemClick = (itemName: string) => {
    onChange(field, itemName);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ marginBottom: "1%" }}
      >
        {value}
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => onItemClick("All Employees")}
          >
            All Employees
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => onItemClick("Average Weekly Hours")}
          >
            Average Weekly Hours
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={() => onItemClick("Average Hourly Earnings")}
          >
            Average Hourly Earnings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
