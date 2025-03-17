interface Props {
  field: string;
  value: string;
  onChange: (field: string, value: string) => void;
  items: string[];
}

const Dropdown = ({ field, value, onChange, items }: Props) => {
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
        {items.map((item) => (
          <li key={item}>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => onItemClick(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
